import { u8aToHex } from '@polkadot/util';
import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip, SubstrateTipper } from '../model';
import { decodeAddress } from '../utils';
import { getTipsTipCall } from './typeGetters/getTipsTipCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const tipCall = getTipsTipCall(ctx, network);
    const blockNumber = BigInt(ctx.block.height);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);
    const date = new Date(ctx.block.timestamp);

    const tipModel = await ctx.store.get(SubstrateTip, u8aToHex(tipCall.hash));
    if (!tipModel) {
      // NOTE: We don't break here because there can be old tippers or tips that are created through the treasury.NewTip.
      // For now we don't need to index those events.
      return;
    }

    const tipperModel = new SubstrateTipper({
      id: `${account}:${u8aToHex(tipCall.hash)}`,
      account,
      rootAccount,
      network,
      blockNumber,
      createdAt: date,
      tip: tipModel,
      tipValue: tipCall.tipValue,
    });

    await ctx.store.save(tipperModel);
  };

