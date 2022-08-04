import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CrowdloanContributedEvent as PolkadotCrowdloanContributedEvent } from '../../types/polkadot/events';
import { CrowdloanContributedEvent as KusamaCrowdloanContributedEvent } from '../../types/kusama/events';
import {Store} from "@subsquid/typeorm-store"

export function getContributedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  fundIndex: number;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new PolkadotCrowdloanContributedEvent(ctx);
      let eventData;

      if (event.isV9110) {
        eventData = event.asV9110;

        return {
          who: eventData[0],
          fundIndex: eventData[1],
          amount: eventData[2],
        }
      }

      if (event.isV9230) {
        return event.asV9230;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new KusamaCrowdloanContributedEvent(ctx);
      let eventData;

      if (event.isV9010) {
        eventData = event.asV9010;

        return {
          who: eventData[0],
          fundIndex: eventData[1],
          amount: eventData[2],
        };
      }

      if (event.isV9230) {
        return event.asV9230;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getContributedEvent::network not supported');
    }
  }
}
