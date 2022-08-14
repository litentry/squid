import {
  EventHandlerContext,
} from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CouncilVotedEvent as KusamaCouncilVotedEvent } from '../../types/kusama/events';
import { CouncilVotedEvent as PolkadotCouncilVotedEvent } from '../../types/polkadot/events';
import { CouncilVotedEvent as KhalaCouncilVotedEvent } from '../../types/khala/events';
import { Store } from '@subsquid/typeorm-store';

export function getCouncilVotedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  proposalHash: Uint8Array;
  voted: boolean;
  yes: number;
  no: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilVotedEvent(ctx);
      if (event.isV1020) {
        const [account, proposalHash, voted, yes, no] = event.asV1020;
        return { account, proposalHash, voted, yes, no };
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilVotedEvent(ctx);

      if (event.isV0) {
        const [account, proposalHash, voted, yes, no] = event.asV0;
        return { account, proposalHash, voted, yes, no };
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilVotedEvent(ctx);

      if (event.isV1) {
        const [account, proposalHash, voted, yes, no] = event.asV1;
        return { account, proposalHash, voted, yes, no };
      }
      if (event.isV1090) {
        return event.asV1090;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getCouncilVotedEvent::network not supported');
    }
  }
}
