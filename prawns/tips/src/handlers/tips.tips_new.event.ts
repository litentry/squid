import { ApiDecoration } from '@polkadot/api/types';
import type { Balance, OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import { hexToString, u8aToHex } from '@polkadot/util';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip } from '../model';
import { SubstrateTipStatus } from '../model/generated/_substrateTipStatus';
import { decodeAddress } from '../utils';
import getApi from '../utils/getApi';
import { getTipsNewTipEvent } from './typeGetters/getTipsTipNewEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.extrinsic) {
      return;
    }

    const newTipEvent = getTipsNewTipEvent(ctx, network);
    const blockNumber = BigInt(ctx.block.height);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);

    const blockHash = ctx.block.hash;
    const api = await getApi(network);
    const apiAtBlock = await api.at(blockHash);
    const date = new Date(ctx.block.timestamp);

    const tipModel = new SubstrateTip({
      id: u8aToHex(newTipEvent.tipHash),
      account,
      rootAccount, 
      network,
      blockNumber,
      createdAt: date,
      updatedAt: date,
      status: SubstrateTipStatus.Opened,
      who: decodeAddress(ctx.extrinsic.args[1].value as string),
      finder: rootAccount,
      tipValue: ctx.extrinsic.args[2]?.value as bigint,
      reason: hexToString(ctx.extrinsic.args[0].value as string),
      deposit: (await getDeposit(apiAtBlock, newTipEvent.tipHash))?.toBigInt(),
    });

    await ctx.store.save(tipModel);
  };

function isCurrentTip(tip: PalletTipsOpenTip | OpenTipTo225): tip is PalletTipsOpenTip {
  return !!(tip as PalletTipsOpenTip)?.findersFee;
}

async function getDeposit(apiAtBlock: ApiDecoration<"promise">, hash: Uint8Array): Promise<Balance | null> {
  const tipOption = await apiAtBlock.query.tips.tips(hash);
  const tip = tipOption.unwrap() as PalletTipsOpenTip | OpenTipTo225;

  if (isCurrentTip(tip)) {
    return tip.deposit as Balance | null;
  } else {
    const finderInfo = tip.finder.unwrap();
    return finderInfo[1] as Balance | null;
  }
}


