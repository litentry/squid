import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyNotPassedEvent as KusamaDemocracyNotPassedEvent } from '../../types/kusama/events';
import { DemocracyNotPassedEvent as PolkadotDemocracyNotPassedEvent } from '../../types/polkadot/events';
import { DemocracyNotPassedEvent as KhalaDemocracyNotPassedEvent } from '../../types/khala/events';

export function getDemocracyNotPassedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyNotPassedEvent(ctx);
      if (event.isV1020) {
        return { refIndex: event.asV1020 };
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyNotPassedEvent(ctx);

      if (event.isV0) {
        return { refIndex: event.asV0 };
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyNotPassedEvent(ctx);

      if (event.isV1) {
        return { refIndex: event.asV1 };
      }
      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getDemocracyNotPassedEvent::network not supported');
    }
  }
}
