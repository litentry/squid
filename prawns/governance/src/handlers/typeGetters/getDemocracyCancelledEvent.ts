import {EventHandlerContext} from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyCancelledEvent as KusamaDemocracyCancelledEvent } from '../../types/kusama/events';
import { DemocracyCancelledEvent as PolkadotDemocracyCancelledEvent } from '../../types/polkadot/events';
import { DemocracyCancelledEvent as KhalaDemocracyCancelledEvent } from '../../types/khala/events';

export function getDemocracyCancelledEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyCancelledEvent(ctx);
      if (event.isV1020) {
        return {refIndex: event.asV1020};
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyCancelledEvent(ctx);

      if (event.isV0) {
        return {refIndex: event.asV0};
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;

    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyCancelledEvent(ctx);

      if (event.isV1) {
        return {refIndex: event.asV1};
      }
      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getDemocracyCancelledEvent::network not supported');
    }
  }
}
