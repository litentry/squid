import type {Result} from './support'

export type H160 = Uint8Array

export interface LegacyTransaction {
  nonce: U256
  gasPrice: U256
  gasLimit: U256
  action: TransactionAction
  value: U256
  input: Uint8Array
  signature: TransactionSignature
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

export type TransactionRecoveryId = bigint

export type H256 = Uint8Array
