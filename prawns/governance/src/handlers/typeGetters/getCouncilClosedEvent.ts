import {
  EventHandlerContext,
} from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CouncilClosedEvent as KusamaCouncilClosedEvent } from '../../types/kusama/events';
import { CouncilClosedEvent as PolkadotCouncilClosedEvent } from '../../types/polkadot/events';
import { CouncilClosedEvent as KhalaCouncilClosedEvent } from '../../types/khala/events';
import { Store } from '@subsquid/typeorm-store';

export function getCouncilClosedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { proposalHash: Uint8Array; yes: number; no: number } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilClosedEvent(ctx);
      if (event.isV1050) {
        const [proposalHash, yes, no] = event.asV1050;
        return { proposalHash, yes, no };
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilClosedEvent(ctx);

      if (event.isV0) {
        const [proposalHash, yes, no] = event.asV0;
        return { proposalHash, yes, no };
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilClosedEvent(ctx);

      if (event.isV1) {
        const [proposalHash, yes, no] = event.asV1;
        return { proposalHash, yes, no };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('Network not supported');
    }
  }
}
