import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { StakingChilledEvent as KusamaStakingChilledEvent } from '../../types/kusama/events';
import { StakingChilledEvent as PolkadotStakingChilledEvent } from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';

export function getStakingChilledEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { stash: string } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingChilledEvent(ctx);

      if (event.isV9090) {
        return {
          stash: encodeAddress(network, event.asV9090),
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingChilledEvent(ctx);

      if (event.isV9090) {
        return {
          stash: encodeAddress(network, event.asV9090),
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingChilledEvent::network not supported');
    }
  }
}
