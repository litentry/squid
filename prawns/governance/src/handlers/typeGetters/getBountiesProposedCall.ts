import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { BountiesProposeBountyCall as KusamaBountiesProposeCall } from '../../types/kusama/calls';
import { BountiesProposeBountyCall as PolkadotBountiesProposeCall } from '../../types/polkadot/calls';
import { BountiesProposeBountyCall as KhalaBountiesProposeCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';

export function getBountiesProposedCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): {
  value: bigint;
  description: Uint8Array;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaBountiesProposeCall(ctx);

      if (call.isV2028) {
        return call.asV2028;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotBountiesProposeCall(ctx);

      if (call.isV28) {
        return call.asV28;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaBountiesProposeCall(ctx);

      if (call.isV1) {
        return call.asV1;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getBountiesProposedCall::network not supported');
    }
  }
}
