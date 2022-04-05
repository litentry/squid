import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingChilledEvent as KusamaStakingChilledEvent
} from '../../types/kusama/events';
import { encodeAddress } from '../../utils';


export function getStakingChilledEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingChilledEvent(ctx);

      const stash = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        stash: encodeAddress(network, stash)
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}