import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TipsTipCall as KhalaTipsTipCall
} from '../../types/khala/calls';
import {
  TipsTipCall as KusamaTipsTipCall
} from '../../types/kusama/calls';
import {
  TipsTipCall as PolkadotTipsTipCall
} from '../../types/polkadot/calls';

export function getTipsTipCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): { hash: Uint8Array, tipValue: bigint } {

  switch (network) {
    case SubstrateNetwork.phala: {
      const call = new KhalaTipsTipCall(ctx);

      if (call.isV1060) {
        return call.asV1060;
      }

      return call.asLatest;
    }

    case SubstrateNetwork.kusama: {
      const call = new KusamaTipsTipCall(ctx);

      if (call.isV2028) {
        return call.asV2028;
      }

      return call.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotTipsTipCall(ctx);

      if (call.isV28) {
        return call.asV28;
      }

      return call.asLatest;
    }

    default: {
      throw new Error('getTipsTipCall::network not supported');
    }
  }
}
