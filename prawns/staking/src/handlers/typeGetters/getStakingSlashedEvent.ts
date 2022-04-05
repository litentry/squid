import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingSlashedEvent as KusamaStakingSlashedEvent
} from '../../types/kusama/events';
import { decodeAddress } from '../../utils';


export function getStakingSlashedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  ): {validator: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingSlashedEvent(ctx);

      const [validator, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        validator: decodeAddress(validator),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}