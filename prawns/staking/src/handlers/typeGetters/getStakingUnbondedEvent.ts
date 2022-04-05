import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingUnbondedEvent as KusamaStakingUnbondedEvent
} from '../../types/kusama/events';
import { encodeAddress } from '../../utils';


export function getStakingUnbondedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingUnbondedEvent(ctx);

      const [stash, amount] = event.isV1051 ? event.asV1051 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}