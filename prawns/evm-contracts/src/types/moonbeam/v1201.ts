import type {Result} from './support'

export type TransactionV2 = TransactionV2_Legacy | TransactionV2_EIP2930 | TransactionV2_EIP1559

export interface TransactionV2_Legacy {
  __kind: 'Legacy'
  value: LegacyTransaction
}

export interface TransactionV2_EIP2930 {
  __kind: 'EIP2930'
  value: EIP2930Transaction
}

export interface TransactionV2_EIP1559 {
  __kind: 'EIP1559'
  value: EIP1559Transaction
}

export interface LegacyTransaction {
  nonce: U256
  gasPrice: U256
  gasLimit: U256
  action: TransactionAction
  value: U256
  input: Uint8Array
  signature: TransactionSignature
}

export interface EIP2930Transaction {
  chainId: bigint
  nonce: U256
  gasPrice: U256
  gasLimit: U256
  action: TransactionAction
  value: U256
  input: Uint8Array
  accessList: AccessListItem[]
  oddYParity: boolean
  r: H256
  s: H256
}

export interface EIP1559Transaction {
  chainId: bigint
  nonce: U256
  maxPriorityFeePerGas: U256
  maxFeePerGas: U256
  gasLimit: U256
  action: TransactionAction
  value: U256
  input: Uint8Array
  accessList: AccessListItem[]
  oddYParity: boolean
  r: H256
  s: H256
}

export type U256 = bigint[]

export type TransactionAction = TransactionAction_Call | TransactionAction_Create

export interface TransactionAction_Call {
  __kind: 'Call'
  value: H160
}

export interface TransactionAction_Create {
  __kind: 'Create'
}

export interface TransactionSignature {
  v: TransactionRecoveryId
  r: H256
  s: H256
}

export interface AccessListItem {
  address: H160
  storageKeys: H256[]
}

export type H256 = Uint8Array

export type H160 = Uint8Array

export type TransactionRecoveryId = bigint
