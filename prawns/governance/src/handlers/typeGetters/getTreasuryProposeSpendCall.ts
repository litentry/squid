import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { TreasuryProposeSpendCall as KusamaTreasuryProposedSpendCall } from '../../types/kusama/calls';
import { TreasuryProposeSpendCall as PolkadotTreasuryProposedSpendCall } from '../../types/polkadot/calls';
import { TreasuryProposeSpendCall as KhalaTreasuryProposedSpendCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import { LookupSource_AccountId } from '../../types/kusama/v1020';

export function getTreasuryProposedSpendCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): {
  value: bigint;
  beneficiary: Uint8Array;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaTreasuryProposedSpendCall(ctx);

      if (call.isV1020) {
        const ret = call.asV1020;
        return {
          value: ret.value,
          beneficiary: (ret.beneficiary as LookupSource_AccountId).value,
        };
      }

      if (call.isV1050) {
        return call.asV1050;
      }

      if (call.isV2028) {
        return {
          ...call.asV2028,
          beneficiary: <Uint8Array>call.asV2028.beneficiary.value,
        };
      }

      if (call.isV9111) {
        return {
          ...call.asV9111,
          beneficiary: <Uint8Array>call.asV9111.beneficiary.value,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotTreasuryProposedSpendCall(ctx);

      if (call.isV0) {
        return call.asV0;
      }

      if (call.isV28) {
        return {
          ...call.asV28,
          beneficiary: <Uint8Array>call.asV28.beneficiary.value,
        };
      }

      if (call.isV9110) {
        return {
          ...call.asV9110,
          beneficiary: <Uint8Array>call.asV9110.beneficiary.value,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaTreasuryProposedSpendCall(ctx);

      if (call.isV1) {
        return {
          ...call.asV1,
          beneficiary: <Uint8Array>call.asV1.beneficiary.value,
        };
      }

      if (call.isV1090) {
        return {
          ...call.asV1090,
          beneficiary: <Uint8Array>call.asV1090.beneficiary.value,
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTreasuryProposedSpendCall::network not supported');
    }
  }
}
