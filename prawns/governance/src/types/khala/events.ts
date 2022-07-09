import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'
import * as v1110 from './v1110'
import * as v1120 from './v1120'
import * as v1140 from './v1140'

export class BountiesBountyProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'bounties.BountyProposed')
  }

  /**
   *  New bounty proposal. \[index\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('bounties.BountyProposed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  New bounty proposal. \[index\]
   */
  get asV1(): number {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New bounty proposal.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('bounties.BountyProposed') === '25a99cc820e15400356f62165725d9d84847d859e62ca1e5fd6eb340dc5c217e'
  }

  /**
   * New bounty proposal.
   */
  get asV1090(): {index: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {index: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class CouncilApprovedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Approved')
  }

  /**
   *  A motion was approved by the required threshold.
   *  \[proposal_hash\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('council.Approved') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  A motion was approved by the required threshold.
   *  \[proposal_hash\]
   */
  get asV1(): Uint8Array {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was approved by the required threshold.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('council.Approved') === 'b8668610145a6851ad2d5b7dd4bfc15e29402d9a8558401ab955896007f866a5'
  }

  /**
   * A motion was approved by the required threshold.
   */
  get asV1090(): {proposalHash: v1090.H256} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {proposalHash: v1090.H256} {
    deprecateLatest()
    return this.asV1090
  }
}

export class CouncilClosedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Closed')
  }

  /**
   *  A proposal was closed because its threshold was reached or after its duration was up.
   *  \[proposal_hash, yes, no\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('council.Closed') === '7d509ca6ee36d401f2d5410aa32038550c256cc3ce4b34cdfe1f8adea0e1679c'
  }

  /**
   *  A proposal was closed because its threshold was reached or after its duration was up.
   *  \[proposal_hash, yes, no\]
   */
  get asV1(): [Uint8Array, number, number] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('council.Closed') === '084e73926c22836c888c17e49053d3b72e2feaa904b8f0175d21fb5b800542f9'
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get asV1090(): {proposalHash: v1090.H256, yes: number, no: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {proposalHash: v1090.H256, yes: number, no: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class CouncilExecutedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Executed')
  }

  /**
   *  A motion was executed; result will be `Ok` if it returned without error.
   *  \[proposal_hash, result\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === 'f98b87482f886396f52d6875083e9b201ac0e3f97d718c37613afad51e85a9b7'
  }

  /**
   *  A motion was executed; result will be `Ok` if it returned without error.
   *  \[proposal_hash, result\]
   */
  get asV1(): [Uint8Array, Result<null, v1.DispatchError>] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '5b848c4d2e38fbfb6752ba650f8662bd0df106f400d22ae305ed497d7574ee03'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV1090(): {proposalHash: v1090.H256, result: Result<null, v1090.DispatchError>} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV1110(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '3f97432326c1bc7a1d2b8f8e2b864f870aa8a7a926361a7af32c8e5c45ed9c5e'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV1110(): {proposalHash: v1110.H256, result: Result<null, v1110.DispatchError>} {
    assert(this.isV1110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV1120(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === 'e7bba992b17737087cf79037068ecde07b0ef6afb29be3ddbe1d7afe57e365aa'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV1120(): {proposalHash: v1120.H256, result: Result<null, v1120.DispatchError>} {
    assert(this.isV1120)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV1140(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '891fd2ad27e5f8bc799d45bb765ef77383902fd4e1cc4c6981cba99123803ac7'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV1140(): {proposalHash: v1140.H256, result: Result<null, v1140.DispatchError>} {
    assert(this.isV1140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1140
  }

  get asLatest(): {proposalHash: v1140.H256, result: Result<null, v1140.DispatchError>} {
    deprecateLatest()
    return this.asV1140
  }
}

export class CouncilProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Proposed')
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   *  \[account, proposal_index, proposal_hash, threshold\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('council.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   *  \[account, proposal_index, proposal_hash, threshold\]
   */
  get asV1(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('council.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV1090(): {account: v1090.AccountId32, proposalIndex: number, proposalHash: v1090.H256, threshold: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {account: v1090.AccountId32, proposalIndex: number, proposalHash: v1090.H256, threshold: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class CouncilVotedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Voted')
  }

  /**
   *  A motion (given hash) has been voted on by given account, leaving
   *  a tally (yes votes and no votes given respectively as `MemberCount`).
   *  \[account, proposal_hash, voted, yes, no\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('council.Voted') === '5693223b18444daea47c5d959a8026ce5084d3e9c76fe5a2be5ef93f3526e0ac'
  }

  /**
   *  A motion (given hash) has been voted on by given account, leaving
   *  a tally (yes votes and no votes given respectively as `MemberCount`).
   *  \[account, proposal_hash, voted, yes, no\]
   */
  get asV1(): [Uint8Array, Uint8Array, boolean, number, number] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been voted on by given account, leaving
   * a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('council.Voted') === 'b69e97272b7c060192bbc1a5e91692b0a8b905727af6d9eb5627b7857ede0846'
  }

  /**
   * A motion (given hash) has been voted on by given account, leaving
   * a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get asV1090(): {account: v1090.AccountId32, proposalHash: v1090.H256, voted: boolean, yes: number, no: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {account: v1090.AccountId32, proposalHash: v1090.H256, voted: boolean, yes: number, no: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyNotPassedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.NotPassed')
  }

  /**
   *  A proposal has been rejected by referendum. \[ref_index\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('democracy.NotPassed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  A proposal has been rejected by referendum. \[ref_index\]
   */
  get asV1(): number {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A proposal has been rejected by referendum.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('democracy.NotPassed') === '8a84371403a09e2f8fc2aac80f5a8a53229b346c4b3859069867b8e656b13450'
  }

  /**
   * A proposal has been rejected by referendum.
   */
  get asV1090(): {refIndex: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {refIndex: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyPassedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Passed')
  }

  /**
   *  A proposal has been approved by referendum. \[ref_index\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('democracy.Passed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  A proposal has been approved by referendum. \[ref_index\]
   */
  get asV1(): number {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A proposal has been approved by referendum.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('democracy.Passed') === '8a84371403a09e2f8fc2aac80f5a8a53229b346c4b3859069867b8e656b13450'
  }

  /**
   * A proposal has been approved by referendum.
   */
  get asV1090(): {refIndex: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {refIndex: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Proposed')
  }

  /**
   *  A motion has been proposed by a public account. \[proposal_index, deposit\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === 'a0e51e81445baa317309351746e010ed2435e30ff7e53fbb2cf59283f3b9c536'
  }

  /**
   *  A motion has been proposed by a public account. \[proposal_index, deposit\]
   */
  get asV1(): [number, bigint] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion has been proposed by a public account.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === '02ae149915d453560f4d12074a380744b3bbb2fe4c235e963f440e2d79243477'
  }

  /**
   * A motion has been proposed by a public account.
   */
  get asV1090(): {proposalIndex: number, deposit: bigint} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {proposalIndex: number, deposit: bigint} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Started')
  }

  /**
   *  A referendum has begun. \[ref_index, threshold\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '31dcae10175d30392db6fc8a872e963baae4bcf3ee28dfd38b1653a0751c031f'
  }

  /**
   *  A referendum has begun. \[ref_index, threshold\]
   */
  get asV1(): [number, v1.VoteThreshold] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A referendum has begun.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '663653944bacc0e562b015a412877b12c32bc62814b673192c550438bf618ab4'
  }

  /**
   * A referendum has begun.
   */
  get asV1090(): {refIndex: number, threshold: v1090.VoteThreshold} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {refIndex: number, threshold: v1090.VoteThreshold} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyTabledEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Tabled')
  }

  /**
   *  A public proposal has been tabled for referendum vote. \[proposal_index, deposit, depositors\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('democracy.Tabled') === '21f3d10122d183ae1df61d3456ae07c362a2e0cdffab1829f4febb4f7b53f6bd'
  }

  /**
   *  A public proposal has been tabled for referendum vote. \[proposal_index, deposit, depositors\]
   */
  get asV1(): [number, bigint, Uint8Array[]] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A public proposal has been tabled for referendum vote.
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('democracy.Tabled') === 'a13f0b4abdda616a48f0910930f31ca5c2a2a8068c5289a35d395475289bd1e0'
  }

  /**
   * A public proposal has been tabled for referendum vote.
   */
  get asV1090(): {proposalIndex: number, deposit: bigint, depositors: v1090.AccountId32[]} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {proposalIndex: number, deposit: bigint, depositors: v1090.AccountId32[]} {
    deprecateLatest()
    return this.asV1090
  }
}

export class DemocracyVotedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Voted')
  }

  /**
   * An account has voted in a referendum
   */
  get isV1110(): boolean {
    return this.ctx._chain.getEventHash('democracy.Voted') === '1f7c6893e642faadc0fb2681a07f3aa74579a935cb93e932ab8fd8a9e9fe739c'
  }

  /**
   * An account has voted in a referendum
   */
  get asV1110(): {voter: v1110.AccountId32, refIndex: number, vote: v1110.AccountVote} {
    assert(this.isV1110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1110
  }

  get asLatest(): {voter: v1110.AccountId32, refIndex: number, vote: v1110.AccountVote} {
    deprecateLatest()
    return this.asV1110
  }
}

export class TechnicalCommitteeProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'technicalCommittee.Proposed')
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   *  \[account, proposal_index, proposal_hash, threshold\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('technicalCommittee.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   *  \[account, proposal_index, proposal_hash, threshold\]
   */
  get asV1(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV1090(): boolean {
    return this.ctx._chain.getEventHash('technicalCommittee.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV1090(): {account: v1090.AccountId32, proposalIndex: number, proposalHash: v1090.H256, threshold: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {account: v1090.AccountId32, proposalIndex: number, proposalHash: v1090.H256, threshold: number} {
    deprecateLatest()
    return this.asV1090
  }
}

export class TreasuryProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Proposed')
  }

  /**
   *  New proposal. \[proposal_index\]
   */
  get isV1(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  New proposal. \[proposal_index\]
   */
  get asV1(): number {
    assert(this.isV1)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New proposal.
   */
  get isV1110(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === 'e9ffb62c9cf38a8abb0e419c0655e66f4415cc9c0faa1066316d07cb033b8ff6'
  }

  /**
   * New proposal.
   */
  get asV1110(): {proposalIndex: number} {
    assert(this.isV1110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1110
  }

  get asLatest(): {proposalIndex: number} {
    deprecateLatest()
    return this.asV1110
  }
}
