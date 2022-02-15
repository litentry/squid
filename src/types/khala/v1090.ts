import type {Result} from './support'

export type AccountId32 = Uint8Array

export type BalanceStatus = BalanceStatus_Free | BalanceStatus_Reserved

export interface BalanceStatus_Free {
  __kind: 'Free'
}

export interface BalanceStatus_Reserved {
  __kind: 'Reserved'
}

export type AccountVote = AccountVote_Standard | AccountVote_Split

export interface AccountVote_Standard {
  __kind: 'Standard'
  vote: Vote
  balance: bigint
}

export interface AccountVote_Split {
  __kind: 'Split'
  aye: bigint
  nay: bigint
}

export type Vote = number
