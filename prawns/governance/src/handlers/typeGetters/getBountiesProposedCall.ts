import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { BountiesProposeBountyCall as KusamaBountiesProposeCall } from '../../types/kusama/calls';
import { BountiesProposeBountyCall as PolkadotBountiesProposeCall } from '../../types/polkadot/calls';
import { BountiesProposeBountyCall as KhalaBountiesProposeCall } from '../../types/polkadot/calls';

export function getBountiesProposedCall(
  ctx: ExtrinsicHandlerContext,
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
      } else {
        return call.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotBountiesProposeCall(ctx);

      if (call.isV28) {
        return call.asV28;
      } else {
        return call.asLatest;
      }
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaBountiesProposeCall(ctx);

      if (call.isV28) {
        return call.asV28;
      } else {
        return call.asLatest;
      }
    }

    default: {
      throw new Error('getBountiesProposedCall::network not supported');
    }
  }
}
