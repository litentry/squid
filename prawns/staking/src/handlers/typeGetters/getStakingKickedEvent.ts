import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { StakingKickedEvent as KusamaStakingKickedEvent } from '../../types/kusama/events';
import { StakingKickedEvent as PolkadotStakingKickedEvent } from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';

export function getStakingKickedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { nominator: string; stash: string } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingKickedEvent(ctx);

      if (event.isV2028) {
        const [nominator, stash] = event.asV2028;

        return {
          nominator: encodeAddress(network, nominator),
          stash: encodeAddress(network, stash),
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingKickedEvent(ctx);

      if (event.isV28) {
        const [nominator, stash] = event.asV28;

        return {
          nominator: encodeAddress(network, nominator),
          stash: encodeAddress(network, stash),
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingKickedEvent::network not supported');
    }
  }
}
