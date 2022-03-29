import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingBondedEvent as KusamaStakingBondedEvent
} from '../../types/kusama/events';
import { decodeAddress } from '../../utils';


export function getStakingBondedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
): {stash: string, amount: bigint} {
  const info = ctx.event;

  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaStakingBondedEvent(ctx);

      if (event.isV1051) {
        const [stash, amount] = event.asV1051;

        return {
          stash: decodeAddress(stash),
          amount,
        }
      }

      const [stash, amount] = event.asLatest;

      return {
        stash: decodeAddress(stash),
        amount,
      }
    }

    default: {
      throw new Error('getStakingBondedEvent::network not supported');
    }
  }
}

