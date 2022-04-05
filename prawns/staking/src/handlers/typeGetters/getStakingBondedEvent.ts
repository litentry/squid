import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingBondedEvent as KusamaStakingBondedEvent
} from '../../types/kusama/events';
import {
  StakingBondedEvent as PolkadotStakingBondedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingBondedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingBondedEvent(ctx);

      const [stash, amount] = event.isV1051 ? event.asV1051 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingBondedEvent(ctx);

      const [stash, amount] = event.isV0 ? event.asV0 : event.asLatest;

      return {
        stash: encodeAddress(network, stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingEvent::network not supported');
    }
  }
}