import { EventHandlerContext, ExtrinsicHandlerContext } from "@subsquid/substrate-processor";
import { SubstrateNetwork } from "../model";
import { getMultisigAsMultiCall } from "../handlers/typeGetters/getMultisigAsMultiCall";

type ExtrinsicHandlerConstructor = (ctx: ExtrinsicHandlerContext, network: SubstrateNetwork) => any;

export function decodeCall<T>(constructor: ExtrinsicHandlerConstructor, ctx: EventHandlerContext, network: SubstrateNetwork): T | undefined {
  const extrinsic = ctx.event.extrinsic;
  if (!extrinsic) {
    throw new Error(`No extrinsic from event: ${JSON.stringify(ctx.event)}`);
  }
  if (extrinsic.name === 'multisig.asMulti') {
    console.log({blockNum: ctx.event.blockNumber, extrinsic: ctx.extrinsic!.args});

    try {
      const multiSigConstructor = getMultisigAsMultiCall(<ExtrinsicHandlerContext>ctx, network);
      const obj = Object.values(multiSigConstructor.call).reduce((obj, [key, value]) => {
        if (key !== '__kind') {
          return {
            ...obj,
            [key]: value
          }
        }
      });
      console.log('decodeCall', obj);
      return obj;
    } catch (e) {
      return;
    }
  }
  return constructor(<ExtrinsicHandlerContext>ctx, network);

}