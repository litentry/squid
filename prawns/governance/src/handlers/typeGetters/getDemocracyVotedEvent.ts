import { SubstrateNetwork } from '../../model';
import { DemocracyVotedEvent as KusamaDemocracyVotedEvent } from '../../types/kusama/events';
import { DemocracyVotedEvent as PolkadotDemocracyVotedEvent } from '../../types/polkadot/events';
import { DemocracyVotedEvent as KhalaDemocracyVotedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';
import { Store } from '@subsquid/typeorm-store';

export function getDemocracyVotedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyVotedEvent(ctx);
      if (event.isV9160) {
        return event.asV9160;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyVotedEvent(ctx);
      if (event.isV9170) {
        return event.asV9170;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyVotedEvent(ctx);
      if (event.isV1110) {
        return event.asV1110;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getDemocracyVotedEvent::network not supported');
    }
  }
}
