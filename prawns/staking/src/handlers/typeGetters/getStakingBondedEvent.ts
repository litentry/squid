import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { StakingBondedEvent as KusamaStakingBondedEvent } from '../../types/kusama/events';
import { StakingBondedEvent as PolkadotStakingBondedEvent } from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';

export function getStakingBondedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { stash: string; amount: bigint } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingBondedEvent(ctx);

      if (event.isV1051) {
        const [stash, amount] = event.asV1051;
        return {
          stash: encodeAddress(network, stash),
          amount,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingBondedEvent(ctx);

      if (event.isV0) {
        const [stash, amount] = event.asV0;
        return {
          stash: encodeAddress(network, stash),
          amount,
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingBondedEvent::network not supported');
    }
  }
}
