import type {Result} from './support'

export type AccountVote = AccountVote_Standard | AccountVote_Split

export interface AccountVote_Standard {
  __kind: 'Standard'
  vote: number
  balance: bigint
}

export interface AccountVote_Split {
  __kind: 'Split'
  aye: bigint
  nay: bigint
}
