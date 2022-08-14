import { SubstrateNetwork } from '../../model';
import { DemocracyProposedEvent as KusamaDemocracyProposedEvent } from '../../types/kusama/events';
import { DemocracyProposedEvent as PolkadotDemocracyProposedEvent } from '../../types/polkadot/events';
import { DemocracyProposedEvent as KhalaDemocracyProposedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';
import { Store } from '@subsquid/typeorm-store';

export function getDemocracyProposedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  proposalIndex: number;
  deposit: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyProposedEvent(ctx);
      if (event.isV1020) {
        const [proposalIndex, deposit] = event.asV1020;
        return { proposalIndex, deposit };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        throw new Error('Unexpected version');
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyProposedEvent(ctx);
      if (event.isV0) {
        const [proposalIndex, deposit] = event.asV0;
        return { proposalIndex, deposit };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        throw new Error('Unexpected version');
      }
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyProposedEvent(ctx);
      if (event.isV1) {
        const [proposalIndex, deposit] = event.asV1;
        return { proposalIndex, deposit };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getDemocracyProposedEvent::network not supported');
    }
  }
}
