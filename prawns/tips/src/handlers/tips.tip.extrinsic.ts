import { u8aToHex } from '@polkadot/util';
import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import { SubstrateNetwork, SubstrateTip, SubstrateTipper } from '../model';
import { decodeAddress, getCallOriginAccount } from '../utils';
import { getTipsTipCall } from './typeGetters/getTipsTipCall';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const tipCall = getTipsTipCall(ctx, network);

    const tipModel = await ctx.store.get(SubstrateTip, u8aToHex(tipCall.hash));
    if (!tipModel) {
      // NOTE: We don't break here because there can be old tippers or tips that are created through the treasury.NewTip.
      // For now we don't need to index those events.
      ctx.log.info(
        `tips.tip.extrinsic::Tip not found: ${u8aToHex(tipCall.hash)}`
      );
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const account = getCallOriginAccount(ctx.call.origin, network);
    assert(account);
    const publicKey = decodeAddress(account);
    const date = new Date(ctx.block.timestamp);

    const tipperModel = new SubstrateTipper({
      id: `${account}:${u8aToHex(tipCall.hash)}`,
      account,
      publicKey,
      network,
      blockNumber,
      createdAt: date,
      tip: tipModel,
      tipValue: tipCall.tipValue,
    });

    await ctx.store.save(tipperModel);
  };
