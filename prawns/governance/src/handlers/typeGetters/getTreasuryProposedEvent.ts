import { SubstrateNetwork } from '../../model';
import { TreasuryProposedEvent as KusamaTreasuryProposedEvent } from '../../types/kusama/events';
import { TreasuryProposedEvent as PolkadotTreasuryProposedEvent } from '../../types/polkadot/events';
import { TreasuryProposedEvent as KhalaTreasuryProposedEvent } from '../../types/polkadot/events';
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
      } else if (event.isV9160) {
        return event.asV9160;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryProposedEvent(ctx);

      if (event.isV0) {
        return { proposalIndex: event.asV0 };
      } else if (event.asV9170) {
        return event.asV9170;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryProposedEvent(ctx);

      if (event.isV0) {
        return { proposalIndex: event.asV0 };
      } else if (event.asV9170) {
        return event.asV9170;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getTreasuryProposedEvent::network not supported');
    }
  }
}
