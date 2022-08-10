import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingUnbondedEvent as KusamaStakingUnbondedEvent
} from '../../types/kusama/events';
import {
  StakingUnbondedEvent as PolkadotStakingUnbondedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';


export function getStakingUnbondedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingUnbondedEvent(ctx);

      if (event.isV1051) {
        const [stash, amount]  = event.asV1051;

        return {
          stash: encodeAddress(network, stash),
          amount,
        }
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingUnbondedEvent(ctx);

      if (event.isV0) {
        const [stash, amount] = event.asV0;
        return {
          stash: encodeAddress(network, stash),
          amount,
        }
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingUnbondedEvent::network not supported');
    }
  }
}