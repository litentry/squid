import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingBondedEvent as KusamaStakingBondedEvent
} from '../../types/kusama/events';


export function getStakingBondedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): [Uint8Array, bigint] {
  const info = ctx.event;

  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingBondedEvent(ctx);

      if (event.isV1051) {
        return event.asV1051;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getStakingBondedEvent::network not supported');
    }
  }
}

