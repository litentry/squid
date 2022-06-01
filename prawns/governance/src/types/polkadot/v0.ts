import type {Result} from './support'

export type VoteThreshold = VoteThreshold_SuperMajorityApprove | VoteThreshold_SuperMajorityAgainst | VoteThreshold_SimpleMajority

export interface VoteThreshold_SuperMajorityApprove {
  __kind: 'SuperMajorityApprove'
}

export interface VoteThreshold_SuperMajorityAgainst {
  __kind: 'SuperMajorityAgainst'
}

export interface VoteThreshold_SimpleMajority {
  __kind: 'SimpleMajority'
}

export type AccountVote = AccountVote_Standard | AccountVote_Split

export interface AccountVote_Standard {
  __kind: 'Standard'
  value: AccountVoteStandard
}

export interface AccountVote_Split {
  __kind: 'Split'
  value: AccountVoteSplit
}

export interface AccountVoteStandard {
  vote: number
  balance: bigint
}

export interface AccountVoteSplit {
  aye: bigint
  nay: bigint
}
