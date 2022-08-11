import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { StakingPayoutStartedEvent as KusamaStakingPayoutStartedEvent } from '../../types/kusama/events';
import { StakingPayoutStartedEvent as PolkadotStakingPayoutStartedEvent } from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';

export function getStakingPayoutStartedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { eraIndex: number; stash: string } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingPayoutStartedEvent(ctx);

      if (event.isV9090) {
        const [eraIndex, stash] = event.asV9090;

        return {
          eraIndex,
          stash: encodeAddress(network, stash),
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingPayoutStartedEvent(ctx);

      if (event.isV9090) {
        const [eraIndex, stash] = event.asV9090;

        return {
          eraIndex,
          stash: encodeAddress(network, stash),
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingPayoutStartedEvent::network not supported');
    }
  }
}
