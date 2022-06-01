import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingRewardedEvent as KusamaStakingRewardedEvent
} from '../../types/kusama/events';
import {
  StakingRewardedEvent as PolkadotStakingRewardedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingRewardedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  ): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingRewardedEvent(ctx);

      const [stash, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingRewardedEvent(ctx);

      const [stash, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingRewardedEvent::network not supported');
    }
  }
}