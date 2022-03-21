import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TipsTipCall as KhalaTipsTipCall
} from '../../types/khala/calls';
// import {
//   TipsTipCall as KusamaTipsTipCall
// } from '../../types/kusama/calls';
// import {
//   TipsTipCall as PolkadotTipsTipCall
// } from '../../types/polkadot/calls';

export function getTipsTipCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): { hash: Uint8Array, tipValue: bigint } {

  switch (network) {
    case SubstrateNetwork.phala: {
      const call = new KhalaTipsTipCall(ctx);

      if (call.isV1060) {
        return call.asV1060;
      }

      return call.asLatest;
    }
    
    // case SubstrateNetwork.kusama: {
    //   const call = new KusamaTipsTipCall(ctx);

    //   // if (call.is) {
    //   //   return call.asV1090;
    //   // } 
    //   // if (call.isV1060) {
    //   //   return call.asV1060;
    //   // } 
    //   // if (call.isV1090) {
    //   //   return call.asV1090;
    //   // } 
    //   // if (call.isV1060) {
    //   //   return call.asV1060;
    //   // } 

    //   // if (call.isV9130) {
    //   //   return call.asV9130;
    //   // } 

    //   return call.asLatest;
    // }
    
    // case SubstrateNetwork.polkadot: {
    //   const call = new PolkadotTipsTipCall(ctx);

    //   if (call.isV9140) {
    //     return call.asV9140;
    //   } 

    //   return call.asLatest;
    // }
    
    default: {
      throw new Error('getTipsTipCall::network not supported');
    }
  }
}
