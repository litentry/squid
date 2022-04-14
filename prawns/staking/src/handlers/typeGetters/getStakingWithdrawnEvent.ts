import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingWithdrawnEvent as KusamaStakingWithdrawnEvent
} from '../../types/kusama/events';
import {
  StakingWithdrawnEvent as PolkadotStakingWithdrawnEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingWithdrawnEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingWithdrawnEvent(ctx);

      const [stash, amount] = event.isV1051 ? event.asV1051 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingWithdrawnEvent(ctx);

      const [stash, amount] = event.isV0 ? event.asV0 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingWithdrawnEvent::network not supported');
    }
  }
}