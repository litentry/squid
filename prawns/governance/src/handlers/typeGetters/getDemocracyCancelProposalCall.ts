import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyCancelProposalCall as KusamaDemocracyCancelProposalCall } from '../../types/kusama/calls';
import { DemocracyCancelProposalCall as PolkadotDemocracyCancelProposalCall } from '../../types/polkadot/calls';
import { DemocracyCancelProposalCall as KhalaDemocracyCancelProposalCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';

export function getDemocracyCancelProposalCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
) {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaDemocracyCancelProposalCall(ctx);

      if (call.isV2025) {
        return call.asV2025;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotDemocracyCancelProposalCall(ctx);

      if (call.isV25) {
        return call.asV25;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaDemocracyCancelProposalCall(ctx);

      if (call.isV1) {
        return call.asV1;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getDemocracyCancelProposalCall::network not supported');
    }
  }
}
