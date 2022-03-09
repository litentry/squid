// todo look into ousing this: https://www.npmjs.com/package/evm

import * as ethers from 'ethers';

const CONTRACT_CREATION_IDENTIFIER = '608060';

enum ContractType {
  ERC20 = 'ERC20',
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721',
}

const CONTRACT_METHODS: {
  [key in ContractType]: string[];
} = {
  [ContractType.ERC20]: [
    'totalSupply()',
    'balanceOf(address)',
    'allowance(address,address)',
    'transfer(address,uint256)',
    'approve(address,uint256)',
    'transferFrom(address,address,uint256)',
  ],
  [ContractType.ERC721]: [
    'balanceOf(address)',
    'ownerOf(uint256)',
    'transferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256)',
    'safeTransferFrom(address,address,uint256,bytes)',
    'approve(address,uint256)',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'getApproved(uint256)',
    'onERC721Received(address,address,uint256,bytes)',
  ],
  [ContractType.ERC1155]: [
    'safeTransferFrom(address,address,uint256,uint256,bytes)',
    'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)',
    // todo find out why the only 1155 contract on moonbeam fails these: https://moonbeam.moonscan.io/address/0x94558a6521185681f35afa05364ca5b142e3b6bf
    // 'balanceOf(address,uint256)',
    // 'balanceOfBatch(address[],uint256[])',
    'setApprovalForAll(address,bool)',
    'isApprovedForAll(address,address)',
    'onERC1155Received(address,address,uint256,uint256,bytes)',
    'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)',
  ],
};

export function getContractType(txInput: string): ContractType | null {
  if (!txInput.includes(CONTRACT_CREATION_IDENTIFIER)) {
    return null;
  }

  const found = Object.entries(CONTRACT_METHODS).find(([_, methods]) => {
    return methods.every((signature) => {
      const methodId = ethers.utils
        .keccak256(Buffer.from(signature))
        .substring(2, 10);
      return txInput.includes(methodId);
    });
  });

  if (!found) {
    return null;
  }

  return found[0] as ContractType;
}
