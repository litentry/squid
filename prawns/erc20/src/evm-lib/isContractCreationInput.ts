const CONTRACT_CREATION_IDENTIFIER = '608060';

export function isContractCreationInput(input: string) {
  return input.includes(CONTRACT_CREATION_IDENTIFIER);
}
