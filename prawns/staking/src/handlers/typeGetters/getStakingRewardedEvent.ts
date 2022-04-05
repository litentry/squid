import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingRewardedEvent as KusamaStakingRewardedEvent
} from '../../types/kusama/events';
import { decodeAddress } from '../../utils';


export function getStakingRewardedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  ): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingRewardedEvent(ctx);

      const [stash, amount] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        stash: decodeAddress(stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}