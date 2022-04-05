import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingPayoutStartedEvent as KusamaStakingPayoutStartedEvent
} from '../../types/kusama/events';
import {
  StakingPayoutStartedEvent as PolkadotStakingPayoutStartedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingPayoutStartedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {eraIndex: number, stash: string} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingPayoutStartedEvent(ctx);

      const [eraIndex, stash] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        eraIndex,
        stash: encodeAddress(network, stash)
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingPayoutStartedEvent(ctx);

      const [eraIndex, stash] = event.isV9090 ? event.asV9090 : event.asLatest;

      return {
        eraIndex,
        stash: encodeAddress(network, stash)
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}