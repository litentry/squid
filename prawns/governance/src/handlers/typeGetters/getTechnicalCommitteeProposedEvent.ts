import { SubstrateNetwork } from '../../model';
import { TechnicalCommitteeProposedEvent as KusamaTechnicalCommitteeProposedEvent } from '../../types/kusama/events';
import { TechnicalCommitteeProposedEvent as PolkadotTechnicalCommitteeProposedEvent } from '../../types/polkadot/events';
import { TechnicalCommitteeProposedEvent as KhalaTechnicalCommitteeProposedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';

export function getTechnicalCommitteeProposedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  proposalIndex: number;
  proposalHash: Uint8Array;
  threshold: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaTechnicalCommitteeProposedEvent(ctx);
      if (event.isV1020) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV1020;
        return { account, proposalIndex, proposalHash, threshold };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTechnicalCommitteeProposedEvent(ctx);
      if (event.isV0) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV0;
        return { account, proposalIndex, proposalHash, threshold };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaTechnicalCommitteeProposedEvent(ctx);
      if (event.isV1) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV1;
        return { account, proposalIndex, proposalHash, threshold };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error(
        'getTechnicalCommitteeProposedEvent::network not supported'
      );
    }
  }
}
