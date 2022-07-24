import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyPassedEvent as KusamaDemocracyPassedEvent } from '../../types/kusama/events';
import { DemocracyPassedEvent as PolkadotDemocracyPassedEvent } from '../../types/polkadot/events';
import { DemocracyPassedEvent as KhalaDemocracyPassedEvent } from '../../types/khala/events';

export function getDemocracyPassedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyPassedEvent(ctx);
      if (event.isV1020) {
        return { refIndex: event.asV1020 };
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyPassedEvent(ctx);

      if (event.isV0) {
        return { refIndex: event.asV0 };
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyPassedEvent(ctx);

      if (event.isV1) {
        return { refIndex: event.asV1 };
      }
      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getDemocracyPassedEvent::network not supported');
    }
  }
}
