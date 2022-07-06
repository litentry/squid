import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyCancelProposalCall as KusamaDemocracyCancelProposalCall } from '../../types/kusama/calls';
import { DemocracyCancelProposalCall as PolkadotDemocracyCancelProposalCall } from '../../types/polkadot/calls';
import { DemocracyCancelProposalCall as KhalaDemocracyCancelProposalCall } from '../../types/khala/calls';

export function getDemocracyCancelProposalCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaDemocracyCancelProposalCall(ctx);

      if (call.isV2025) {
        return call.asV2025
      }

      return call.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotDemocracyCancelProposalCall(ctx);

      if (call.isV25) {
        return call.asV25
      }

      return call.asLatest;
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaDemocracyCancelProposalCall(ctx);

      if (call.isV1) {
        return call.asV1;
      }

      return call.asLatest;
    }

    default: {
      throw new Error('getDemocracyCancelProposalCall::network not supported');
    }
  }
}
