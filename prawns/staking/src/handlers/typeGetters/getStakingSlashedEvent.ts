import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingSlashedEvent as KusamaStakingSlashedEvent
} from '../../types/kusama/events';
import {
  StakingSlashedEvent as PolkadotStakingSlashedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingSlashedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  ): {validator: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingSlashedEvent(ctx);

      const [validator, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        validator: encodeAddress(network, validator),
        amount,
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingSlashedEvent(ctx);

      const [validator, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        validator: encodeAddress(network, validator),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}