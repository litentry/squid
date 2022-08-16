import { encodeAddress } from './registry';
import { decodeHex } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';

export default (origin: any, network: SubstrateNetwork) => {
  if (!origin) return undefined;
  switch (origin.__kind) {
    case 'system':
      switch (origin.value.__kind) {
        case 'Signed':
          return encodeAddress(network, decodeHex(origin.value.value));
        default:
          return undefined;
      }
    default:
      return undefined;
  }
};
