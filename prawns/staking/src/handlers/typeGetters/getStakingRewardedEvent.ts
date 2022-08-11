import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { StakingRewardedEvent as KusamaStakingRewardedEvent } from '../../types/kusama/events';
import { StakingRewardedEvent as PolkadotStakingRewardedEvent } from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';
import { Store } from '@subsquid/typeorm-store';

export function getStakingRewardedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { stash: string; amount: bigint } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingRewardedEvent(ctx);

      if (event.isV9090) {
        const [stash, amount] = event.asV9090;

        return {
          stash: encodeAddress(network, stash),
          amount,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingRewardedEvent(ctx);

      if (event.isV9090) {
        const [stash, amount] = event.asV9090;

        return {
          stash: encodeAddress(network, stash),
          amount,
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getStakingRewardedEvent::network not supported');
    }
  }
}
