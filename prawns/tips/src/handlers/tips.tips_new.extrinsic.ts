import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip } from '../model';
import { decodeAddress } from '../utils';
import { getTipsTipNewCall } from './typeGetters/getTipsTipNewCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);
    const newTipCall = getTipsTipNewCall(ctx, network);

    console.log(ctx.event.params);

    const tipModel = new SubstrateTip({
      id: ctx.extrinsic.hash?.toString(),
      account,
      rootAccount, 
      network,
      blockNumber,
      who: decodeAddress(newTipCall.who),
      finder: "",
      reason: newTipCall.reason.toString(),
      closes: BigInt(1),
      deposit: "",
      // amount: newTipCall.tipValuew
    });

    await ctx.store.save(tipModel);
  };
