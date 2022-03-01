import { decodeAddress } from '@polkadot/util-crypto';

export default (address: string | Uint8Array): string => {
  return '0x' + Buffer.from(decodeAddress(address)).toString('hex');
};
