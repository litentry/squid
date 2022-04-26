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

export type GenericMultiAddress = GenericMultiAddress_Id | GenericMultiAddress_Index | GenericMultiAddress_Raw | GenericMultiAddress_Address32 | GenericMultiAddress_Address20

export interface GenericMultiAddress_Id {
  __kind: 'Id'
  value: Uint8Array
}

export interface GenericMultiAddress_Index {
  __kind: 'Index'
  value: number
}

export interface GenericMultiAddress_Raw {
  __kind: 'Raw'
  value: Uint8Array
}

export interface GenericMultiAddress_Address32 {
  __kind: 'Address32'
  value: Uint8Array
}

export interface GenericMultiAddress_Address20 {
  __kind: 'Address20'
  value: Uint8Array
}

export interface AccountVoteStandard {
  vote: number
  balance: bigint
}

export interface AccountVoteSplit {
  aye: bigint
  nay: bigint
}
