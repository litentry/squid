import { ApiPromise } from '@polkadot/api';
// import getAccountHex from './getAccountHex';

export default function isFundAddress(address: Uint8Array, api: ApiPromise) {
  // const hex = getAccountHex(address); todo see if we can swap this and the line below
  const hexStr = api.createType('Address', address).toHex();
  return Buffer.from(hexStr.slice(4, 28), 'hex')
    .toString()
    .startsWith('modlpy/cfund');
}
