// todo look into ousing this: https://www.npmjs.com/package/evm

import * as ethers from 'ethers';
import CONTRACT_METHODS, { ContractType } from './contractMethods';

export function getContractType(methodsInContract: string[]): ContractType {
  const found = Object.entries(CONTRACT_METHODS).find(([type, methods]) => {
    return methods.every((method) => methodsInContract.includes(method));
  });

  if (!found) return 'unknown';

  return found[0] as ContractType;
}

// original method before evm lib
export function getContractTypeFromRaw(txInput: string): ContractType | null {
  const found = Object.entries(CONTRACT_METHODS).find(([_, methods]) => {
    return methods.every((signature) => {
      const methodId = ethers.utils
        .keccak256(Buffer.from(signature))
        .substring(2, 10);
      return txInput.includes(methodId);
    });
  });

  if (!found) {
    return 'unknown';
  }

  return found[0] as ContractType;
}
