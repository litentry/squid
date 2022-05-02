import { ApiDecoration } from '@polkadot/api/types';
import type { Balance, OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import { hexToString, u8aToHex } from '@polkadot/util';
import { Codec } from '@subsquid/scale-codec';
import { EventHandlerContext, ExtrinsicArg, SubstrateExtrinsic } from '@subsquid/substrate-processor';
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

    const proxyCallArgs = getFieldFromExtrinsicArgs(ctx.extrinsic.args, 'call');
    const args = getArgsFromCall(ctx, ctx.extrinsic, proxyCallArgs);

    if (!args) {
      return;
    }

    const {who, reason, tipValue} = args;

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
      who: decodeAddress(who),
      finder: rootAccount,
      tipValue,
      reason,
      deposit: (await getDeposit(apiAtBlock, newTipEvent.tipHash))?.toBigInt(),
    });

    await ctx.store.save(tipModel);
  };

function getMultiSigCallArgs(ctx: EventHandlerContext, proxyCallArgs: any): {
  who: string,
  reason: string,
  tipValue: bigint | null,
} | null {
  const c = new Codec(ctx._chain.description.types);
  const data = c.decodeBinary(ctx._chain.description.call, proxyCallArgs);

  const who = data.value.who ? '0x' + Buffer.from(data.value.who).toString('hex') : null;
  const reason = data.value.reason ? Buffer.from(data.value.reason).toString() : null;
  const tipValue = data.value.tipValue ? Buffer.from(data.value.tipValue).toString() : null;

  if (!who || !reason) {
    return null;
  }

  return {
    who,
    reason,
    tipValue: tipValue ? BigInt(tipValue) : null,
  };
}

function getArgsFromCall(ctx: EventHandlerContext, extrinsic: SubstrateExtrinsic, proxyCallArgs: any): {
  who: string,
  reason: string,
  tipValue: bigint | null,
} | null {
  if (extrinsic.method === 'asMulti') {
    return getMultiSigCallArgs(ctx, proxyCallArgs);
  }

  return {
    who: proxyCallArgs ? proxyCallArgs.args.who : getFieldFromExtrinsicArgs(extrinsic.args, 'who') as string,
    reason: hexToString(proxyCallArgs ? proxyCallArgs.args.reason : getFieldFromExtrinsicArgs(extrinsic.args, 'reason') as string),
    tipValue: proxyCallArgs ? proxyCallArgs.args.tipValue : getFieldFromExtrinsicArgs(extrinsic.args, 'tipValue') as bigint,
  };
}

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

function getFieldFromExtrinsicArgs(args: ExtrinsicArg[], name: string): any {
  return (args.find(arg => arg.name === name))?.value;
}
