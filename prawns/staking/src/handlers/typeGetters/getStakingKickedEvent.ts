import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingKickedEvent as KusamaStakingKickedEvent
} from '../../types/kusama/events';
import {
  StakingKickedEvent as PolkadotStakingKickedEvent
} from '../../types/polkadot/events';
import { encodeAddress } from '../../utils';


export function getStakingKickedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {nominator: string, stash: string} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingKickedEvent(ctx);

      const [nominator, stash] = event.isV2028 ? event.asV2028 : event.asLatest;

      return {
        nominator: encodeAddress(network, nominator),
        stash: encodeAddress(network, stash)
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotStakingKickedEvent(ctx);

      const [nominator, stash] = event.isV28 ? event.asV28 : event.asLatest;

      return {
        nominator: encodeAddress(network, nominator),
        stash: encodeAddress(network, stash)
      }
    }

    default: {
      throw new Error('getStakingKickedEvent::network not supported');
    }
  }
}