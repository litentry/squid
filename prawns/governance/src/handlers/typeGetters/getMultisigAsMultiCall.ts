import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { MultisigAsMultiCall as KusamaMultisigAsMultiCall } from '../../types/kusama/calls';
import { MultisigAsMultiCall as PolkadotMultisigAsMultiCall } from '../../types/polkadot/calls';
import { MultisigAsMultiCall as KhalaMultisigAsMultiCall } from '../../types/polkadot/calls';

type Call = {
  __kind: string,
  [k: string]: any
}

export function getMultisigAsMultiCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): {
  threshold: number;
  otherSignatories: Uint8Array[];
  maybeTimepoint: { height: number, index: number } | undefined
  call: Call
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const extrinsic = new KusamaMultisigAsMultiCall(ctx);

      if (extrinsic.isV2005) {
        return extrinsic.asV2005;
      } else if (extrinsic.isV2007) {
        return extrinsic.asV2007;
      } else if (extrinsic.isV2011) {
        const {threshold, call, maybeTimepoint, otherSignatories} = extrinsic.asV2011;
        // not sure how to process call for spec v2011 - it comes through a raw UInt8Array
        console.log('v2011 Multisig.asMulti', {threshold, call, maybeTimepoint, otherSignatories});
        throw new Error('v2011 Multisig.asMulti unsupported');
      } else if (extrinsic.isV9160) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9160;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else if (extrinsic.isV9170) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9160;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asLatest;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      }
    }

    case SubstrateNetwork.polkadot: {
      const extrinsic = new PolkadotMultisigAsMultiCall(ctx);

      if (extrinsic.isV5) {
        return extrinsic.asV5;
      } else if (extrinsic.isV6) {
        return extrinsic.asV6;
      } else if (extrinsic.isV7) {
        return extrinsic.asV7;
      } else if (extrinsic.isV9) {
        return extrinsic.asV9;
      } else if (extrinsic.isV10) {
        const {threshold, call, maybeTimepoint, otherSignatories} = extrinsic.asV10;
        // not sure how to process call for spec v10 - it comes through a raw UInt8Array
        console.log('v10 Multisig.asMulti', {threshold, call, maybeTimepoint, otherSignatories});
        throw new Error('v10 Multisig.asMulti unsupported');
      } else if (extrinsic.isV9140) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9140;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else if (extrinsic.isV9170) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9170;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else if (extrinsic.isV9180) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9180;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asLatest;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      }
    }

    case SubstrateNetwork.phala: {
      const extrinsic = new KhalaMultisigAsMultiCall(ctx);

      if (extrinsic.isV5) {
        return extrinsic.asV5;
      } else if (extrinsic.isV6) {
        return extrinsic.asV6;
      } else if (extrinsic.isV7) {
        return extrinsic.asV7;
      } else if (extrinsic.isV9) {
        return extrinsic.asV9;
      } else if (extrinsic.isV10) {
        const {threshold, call, maybeTimepoint, otherSignatories} = extrinsic.asV10;
        // not sure how to process call for spec v10 - it comes through a raw UInt8Array
        console.log('v10 Multisig.asMulti', {threshold, call, maybeTimepoint, otherSignatories});
        throw new Error('v10 Multisig.asMulti unsupported');
      } else if (extrinsic.isV9140) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9140;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else if (extrinsic.isV9170) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9170;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else if (extrinsic.isV9180) {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asV9180;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      } else {
        const {threshold, call: wrappedCall, maybeTimepoint, otherSignatories} = extrinsic.asLatest;
        const call = wrappedCall[1];
        return {threshold, call, maybeTimepoint, otherSignatories};
      }
    }

    default: {
      throw new Error('getMultisigAsMultidCall::network not supported');
    }
  }
}
