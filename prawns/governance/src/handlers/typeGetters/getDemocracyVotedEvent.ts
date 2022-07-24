import { SubstrateNetwork } from '../../model';
import { DemocracyVotedEvent as KusamaDemocracyVotedEvent } from '../../types/kusama/events';
import { DemocracyVotedEvent as PolkadotDemocracyVotedEvent } from '../../types/polkadot/events';
import { DemocracyVotedEvent as KhalaDemocracyVotedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';

export function getDemocracyVotedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyVotedEvent(ctx);
      if (event.isV9160) {
        return event.asV9160;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyVotedEvent(ctx);
      if (event.isV9170) {
        return event.asV9170;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyVotedEvent(ctx);
      if (event.isV1110) {
        return event.asV1110;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getDemocracyVotedEvent::network not supported');
    }
  }
}
