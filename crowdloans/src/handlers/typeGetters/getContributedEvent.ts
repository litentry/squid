import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CrowdloanContributedEvent as PolkadotCrowdloanContributedEvent } from '../../types/polkadot/events';
import { CrowdloanContributedEvent as KusamaCrowdloanContributedEvent } from '../../types/kusama/events';

export function getContributedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  address: Uint8Array;
  paraId: number;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new PolkadotCrowdloanContributedEvent(ctx);
      let eventData;

      if (event.isV9110) {
        eventData = event.asV9110;
      } else {
        eventData = event.asLatest;
      }

      return {
        address: eventData[0],
        paraId: eventData[1],
        amount: eventData[2],
      };
    }

    case SubstrateNetwork.polkadot: {
      const event = new KusamaCrowdloanContributedEvent(ctx);
      let eventData;

      if (event.isV9010) {
        eventData = event.asV9010;
      } else {
        eventData = event.asLatest;
      }

      return {
        address: eventData[0],
        paraId: eventData[1],
        amount: eventData[2],
      };
    }

    default: {
      throw new Error('getContributedEvent::network not supported');
    }
  }
}
