import { SubstrateNetwork } from '../../model';
import { CouncilProposedEvent as KusamaCouncilProposedEvent } from '../../types/kusama/events';
import { CouncilProposedEvent as PolkadotCouncilProposedEvent } from '../../types/polkadot/events';
import { CouncilProposedEvent as KhalaCouncilProposedEvent } from '../../types/polkadot/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';

export function getCouncilProposedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {account: Uint8Array, proposalIndex: number, proposalHash: Uint8Array, threshold: number} {


  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilProposedEvent(ctx);
      if (event.isV1020) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV1020
        return {account, proposalIndex, proposalHash, threshold};
      } else if (event.isV9130) {
        return event.asV9130
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilProposedEvent(ctx);
      if (event.isV0) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV0;
        return {account, proposalIndex, proposalHash, threshold};
      } else if (event.isV9140) {
        return event.asV9140
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilProposedEvent(ctx);
      if (event.isV0) {
        const [account, proposalIndex, proposalHash, threshold] = event.asV0;
        return {account, proposalIndex, proposalHash, threshold};
      } else if (event.isV9140) {
        return event.asV9140
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getCouncilProposedEvent::network not supported');
    }
  }
}
