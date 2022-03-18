import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TipsTipNewCall as KhalaTipsTipNewCall
} from '../../types/khala/calls';
import {
  TipsTipNewCall as KusamaTipsTipNewCall
} from '../../types/kusama/calls';
import {
  TipsTipNewCall as PolkadotTipsTipNewCall
} from '../../types/polkadot/calls';


export function getTipsTipNewCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): {reason: Uint8Array, who: Uint8Array, tipValue: bigint} {

  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTipsTipNewCall(ctx);

      if (event.isV1060) {
        return event.asV1060;
      } 

      return event.asLatest;
    }    
    
    case SubstrateNetwork.kusama: {
      const event = new KusamaTipsTipNewCall(ctx);

      if (event.isV2028) {
        return event.asV2028;
      } 

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTipsTipNewCall(ctx);

      if (event.isV28) {
        return event.asV28;
      } 

      return event.asLatest;
    }
    
    default: {
      throw new Error('getBalancesDepositEvent::network not supported');
    }
  }
}
