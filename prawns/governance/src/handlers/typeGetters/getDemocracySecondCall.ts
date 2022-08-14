import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracySecondCall as KusamaDemocracySecondCall } from '../../types/kusama/calls';
import { DemocracySecondCall as PolkadotDemocracySecondCall } from '../../types/polkadot/calls';
import { DemocracySecondCall as KhalaDemocracySecondCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';

export function getDemocracySecondCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): {
  proposal: number;
  upperBound?: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaDemocracySecondCall(ctx);

      if (call.isV1020) {
        return call.asV1020;
      }

      if (call.isV2005) {
        return call.asV2005;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotDemocracySecondCall(ctx);

      if (call.isV0) {
        return call.asV0;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaDemocracySecondCall(ctx);

      if (call.isV1) {
        return call.asV1;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getDemocracySecondCall::network not supported');
    }
  }
}
