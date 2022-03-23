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
      console.log(`tips.tip.extrinsic::Tip not found: ${blockNumber}`);
      console.log(`tips.tip.extrinsic::Tip not found: ${ctx.event.id}`);
      console.log(`tips.tip.extrinsic::Tip not found: ${u8aToHex(tipCall.hash)}`);
      return;
      // throw new Error(`tips.tip.extrinsic::Tip not found: ${u8aToHex(tipCall.hash)}`);
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

