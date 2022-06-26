import { SubstrateNetwork } from '../../model';
import { BountiesBountyProposedEvent as KusamaBountiesProposeEvent } from '../../types/kusama/events';
import { BountiesBountyProposedEvent as PolkadotBountiesProposeEvent } from '../../types/polkadot/events';
import { BountiesBountyProposedEvent as KhalaBountiesProposeEvent } from '../../types/khala/events';
import { EventHandlerContext } from "@subsquid/substrate-processor/lib";

export function getBountiesBountyProposedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  index: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaBountiesProposeEvent(ctx);

      if (event.isV2028) {
        return { index: event.asV2028 };
      }

      if (event.isV9130) {
        return event.asV9130;
      }
        return event.asLatest;

    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBountiesProposeEvent(ctx);

      if (event.isV28) {
        return { index: event.asV28 };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

        return event.asLatest;

    }

    case SubstrateNetwork.phala: {
      const event = new KhalaBountiesProposeEvent(ctx);

      if (event.isV1) {
        return { index: event.asV1 };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getBountiesBountyProposedEvent::network not supported');
    }
  }
}
