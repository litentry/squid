import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingSlashedEvent as KusamaStakingSlashedEvent
} from '../../types/kusama/events';
import {
  StakingSlashedEvent as PolkadotStakingSlashedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';


export function getStakingSlashedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  ): {validator: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingSlashedEvent(ctx);

      if (event.isV9090) {
        const [validator, amount]  = event.asV9090;

        return {
          validator: encodeAddress(network, validator),
          amount,
        }
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingSlashedEvent(ctx);

      if (event.isV9090) {
        const [validator, amount]  = event.asV9090;

        return {
          validator: encodeAddress(network, validator),
          amount,
        }
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingSlashedEvent::network not supported');
    }
  }
}