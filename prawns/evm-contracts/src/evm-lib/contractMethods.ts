export type ContractType = 'ERC20' | 'ERC721' | 'ERC1155' | 'unknown';

const CONTRACT_METHODS: {
  [method: string]: string[];
} = {
  ERC20: [
    'totalSupply()',
    'balanceOf(address)',
    'allowance(address,address)',
    'transfer(address,uint256)',
    'approve(address,uint256)',
    'transferFrom(address,address,uint256)',
  ],
  ERC721: [
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
  ERC1155: [
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

export default CONTRACT_METHODS;
