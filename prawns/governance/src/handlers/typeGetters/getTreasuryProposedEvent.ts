import { SubstrateNetwork } from '../../model';
import { TreasuryProposedEvent as KusamaTreasuryProposedEvent } from '../../types/kusama/events';
import { TreasuryProposedEvent as PolkadotTreasuryProposedEvent } from '../../types/polkadot/events';
import { TreasuryProposedEvent as KhalaTreasuryProposedEvent } from '../../types/khala/events';
import { EventHandlerContext } from "@subsquid/substrate-processor/lib";

export function getTreasuryProposedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  proposalIndex: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaTreasuryProposedEvent(ctx);

      if (event.isV1020) {
        return { proposalIndex: event.asV1020 };
      }

      if (event.isV9160) {
        return event.asV9160;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryProposedEvent(ctx);

      if (event.isV0) {
        return { proposalIndex: event.asV0 };
      }

      if (event.isV9170) {
        return event.asV9170;
      }

      return event.asLatest;

    }

    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryProposedEvent(ctx);

      if (event.isV1) {
        return { proposalIndex: event.asV1 };
      }

      if (event.isV1110) {
        return event.asV1110;
      }

      return event.asLatest;

    }

    default: {
      throw new Error('getTreasuryProposedEvent::network not supported');
    }
  }
}
