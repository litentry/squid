import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  StakingNominateCall as KusamaStakingNominateCall
} from '../../types/kusama/calls';
import {
  StakingNominateCall as PolkadotStakingNominateCall
} from '../../types/polkadot/calls';
import { Store } from '@subsquid/typeorm-store';

const format = (foo: {targets: {__kind: string, value?: any}[]}) => ({targets: foo.targets.map(o => (o.value instanceof Uint8Array ? o.value : null))});

export function getStakingNominateExtrinsic(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork,
): {targets: (Uint8Array|null)[]} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaStakingNominateCall(ctx);

      if (call.isV9111) {
        return format(call.asV9111);
      }

      if (call.isV1020) {
        return format(call.asV1020)
      }

      if (call.isV2028) {
        return format(call.asV2028)
      }

      if (call.isV1050) {
        return call.asV1050
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotStakingNominateCall(ctx);

      if (call.isV0) {
        return call.asV0
      }

      if (call.isV28) {
        return format(call.asV28);
      }
      
      if (call.isV9110) {
        return format(call.asV9110);
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('Network not supported');
    }
  }
}