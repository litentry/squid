import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CouncilVoteCall as KusamaCouncilVoteCall } from '../../types/kusama/calls';
import { CouncilVoteCall as PolkadotCouncilVoteCall } from '../../types/polkadot/calls';
import { CouncilVoteCall as KhalaCouncilVoteCall } from '../../types/khala/calls';

export function getCouncilVoteCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): {
  proposal: Uint8Array;
  index: number;
  approve: boolean;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilVoteCall(ctx);

      if (event.isV1020) {
        return event.asV1020;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilVoteCall(ctx);

      if (event.isV0) {
        return event.asV0;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilVoteCall(ctx);

      if (event.isV1) {
        return event.asV1;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getCouncilVoteCall::network not supported');
    }
  }
}
