import { ApiDecoration } from '@polkadot/api/types';
import type { Balance, OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import { u8aToHex } from '@polkadot/util';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import { SubstrateNetwork, SubstrateTip } from '../model';
import { SubstrateTipStatus } from '../model/generated/_substrateTipStatus';
import { decodeAddress, getCallOriginAccount } from '../utils';
import getApi from '../utils/getApi';
import { getArgsFromCall } from '../utils/getArgsFromCall';
import { getTipsNewTipEvent } from './typeGetters/getTipsTipNewEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event || !ctx.event.call) {
      return;
    }

    const { who, reason, tipValue } = getArgsFromCall(ctx, ctx.event.call);

    const newTipEvent = getTipsNewTipEvent(ctx, network);
    const blockNumber = BigInt(ctx.block.height);

    const account = getCallOriginAccount(ctx.event.call?.origin, network);
    assert(account);
    const publicKey = decodeAddress(account);

    const blockHash = ctx.block.hash;
    const api = await getApi(network);
    const apiAtBlock = await api.at(blockHash);
    const date = new Date(ctx.block.timestamp);

    const tipModel = new SubstrateTip({
      id: u8aToHex(newTipEvent.tipHash),
      account,
      publicKey,
      network,
      blockNumber,
      createdAt: date,
      updatedAt: date,
      status: SubstrateTipStatus.Opened,
      who,
      finder: account,
      tipValue,
      reason,
      deposit: (await getDeposit(apiAtBlock, newTipEvent.tipHash))?.toBigInt(),
    });

    await ctx.store.save(tipModel);
  };

function isCurrentTip(
  tip: PalletTipsOpenTip | OpenTipTo225
): tip is PalletTipsOpenTip {
  return !!(tip as PalletTipsOpenTip)?.findersFee;
}

async function getDeposit(
  apiAtBlock: ApiDecoration<'promise'>,
  hash: Uint8Array
): Promise<Balance | null> {
  const tipOption = await apiAtBlock.query.tips?.tips(hash);
  if (!tipOption || tipOption.isEmpty) {
    return null;
  }
  const tip = tipOption.unwrap() as PalletTipsOpenTip | OpenTipTo225;

  if (isCurrentTip(tip)) {
    return tip.deposit as Balance | null;
  } else {
    const finderInfo = tip.finder.unwrap();
    return finderInfo[1] as Balance | null;
  }
}
