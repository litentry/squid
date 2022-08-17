import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateNetwork } from '../../model';
import { TipsTipCall as KhalaTipsTipCall } from '../../types/khala/calls';
import { TipsTipCall as KusamaTipsTipCall } from '../../types/kusama/calls';
import { TipsTipCall as PolkadotTipsTipCall } from '../../types/polkadot/calls';

export function getTipsTipCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): { hash: Uint8Array; tipValue: bigint } {
  switch (network) {
    case SubstrateNetwork.phala: {
      const call = new KhalaTipsTipCall(ctx);

      if (call.isV1060) {
        return call.asV1060;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.kusama: {
      const call = new KusamaTipsTipCall(ctx);

      if (call.isV2028) {
        return call.asV2028;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotTipsTipCall(ctx);

      if (call.isV28) {
        return call.asV28;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTipsTipCall::network not supported');
    }
  }
}
