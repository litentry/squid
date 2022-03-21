import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TipsNewTipEvent as KhalaTipsNewTipEvent
} from '../../types/khala/events';


export function getTipsNewTipEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {tipHash: Uint8Array} {

  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTipsNewTipEvent(ctx);

      if (event.isV1060) {
        return {tipHash: event.asV1060};
      } 

      if (event.isV1090) {
        return event.asV1090;
      } 

      return event.asLatest;
    }    
    
    default: {
      throw new Error('getBalancesDepositEvent::network not supported');
    }
  }
}
