import * as ss58 from '@subsquid/ss58';
import { decodeAddress as da } from '@polkadot/util-crypto';
import { SubstrateNetwork } from '../model';

export const getRegistry = (network: SubstrateNetwork) => {
  return ss58.registry.get(network);
};

export const decodeAddress = (address: string | Uint8Array): string => {
  return '0x' + Buffer.from(da(address)).toString('hex');
};

export const encodeAddress = (
  network: SubstrateNetwork,
  address: Uint8Array
) => {
  const registry = ss58.registry.get(network);
  const addressCodec = ss58.codec(registry.prefix);

  return addressCodec.encode(address);
};
