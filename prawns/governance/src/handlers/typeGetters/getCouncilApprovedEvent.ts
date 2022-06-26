import {EventHandlerContext, ExtrinsicHandlerContext} from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CouncilApprovedEvent as KusamaCouncilApprovedEvent } from '../../types/kusama/events';
import { CouncilApprovedEvent as PolkadotCouncilApprovedEvent } from '../../types/polkadot/events';
import { CouncilApprovedEvent as KhalaCouncilApprovedEvent } from '../../types/khala/events';

export function getCouncilApprovedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {proposalHash: Uint8Array} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilApprovedEvent(ctx);
      if (event.isV1020) {
        return {proposalHash: event.asV1020};
      }
      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilApprovedEvent(ctx);

      if (event.isV0) {
        return {proposalHash: event.asV0};
      }
      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilApprovedEvent(ctx);

      if (event.isV1) {
        return {proposalHash: event.asV1};
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('Network not supported');
    }
  }
}
