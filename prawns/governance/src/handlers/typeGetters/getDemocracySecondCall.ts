import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracySecondCall as KusamaDemocracySecondCall } from '../../types/kusama/calls';
import { DemocracySecondCall as PolkadotDemocracySecondCall } from '../../types/polkadot/calls';
import { DemocracySecondCall as KhalaDemocracySecondCall } from '../../types/polkadot/calls';

export function getDemocracySecondCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): {
  proposal: number;
  upperBound?: number;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracySecondCall(ctx);

      if (event.isV1020) {
        return event.asV1020;
      } else if (event.isV2005) {
        return event.asV2005;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracySecondCall(ctx);

      if (event.isV0) {
        return event.asV0;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracySecondCall(ctx);

      if (event.isV0) {
        return event.asV0;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getDemocracySecondCall::network not supported');
    }
  }
}
