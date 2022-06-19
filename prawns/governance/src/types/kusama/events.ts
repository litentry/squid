import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1020 from './v1020'
import * as v2005 from './v2005'
import * as v9111 from './v9111'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
import * as v9170 from './v9170'
import * as v9190 from './v9190'

export class BountiesBountyProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'bounties.BountyProposed')
  }

  /**
   *  New bounty proposal. \[index\]
   */
  get isV2028(): boolean {
    return this.ctx._chain.getEventHash('bounties.BountyProposed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  New bounty proposal. \[index\]
   */
  get asV2028(): number {
    assert(this.isV2028)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New bounty proposal.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('bounties.BountyProposed') === '25a99cc820e15400356f62165725d9d84847d859e62ca1e5fd6eb340dc5c217e'
  }

  /**
   * New bounty proposal.
   */
  get asV9130(): {index: number} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {index: number} {
    deprecateLatest()
    return this.asV9130
  }
}

export class CouncilApprovedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Approved')
  }

  /**
   *  A motion was approved by the required threshold.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('council.Approved') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  A motion was approved by the required threshold.
   */
  get asV1020(): Uint8Array {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was approved by the required threshold.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('council.Approved') === 'b8668610145a6851ad2d5b7dd4bfc15e29402d9a8558401ab955896007f866a5'
  }

  /**
   * A motion was approved by the required threshold.
   */
  get asV9130(): {proposalHash: v9130.H256} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {proposalHash: v9130.H256} {
    deprecateLatest()
    return this.asV9130
  }
}

export class CouncilClosedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Closed')
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('council.Closed') === '7d509ca6ee36d401f2d5410aa32038550c256cc3ce4b34cdfe1f8adea0e1679c'
  }

  /**
   *  A proposal was closed after its duration was up.
   */
  get asV1050(): [Uint8Array, number, number] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('council.Closed') === '084e73926c22836c888c17e49053d3b72e2feaa904b8f0175d21fb5b800542f9'
  }

  /**
   * A proposal was closed because its threshold was reached or after its duration was up.
   */
  get asV9130(): {proposalHash: v9130.H256, yes: number, no: number} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {proposalHash: v9130.H256, yes: number, no: number} {
    deprecateLatest()
    return this.asV9130
  }
}

export class CouncilExecutedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Executed')
  }

  /**
   *  A motion was executed; `bool` is true if returned without error.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '3e84284a56e2d90e928c790a4788cf7ee237d5a6d76716a3e8584e3dcc0319a0'
  }

  /**
   *  A motion was executed; `bool` is true if returned without error.
   */
  get asV1020(): [Uint8Array, boolean] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   *  A motion was executed; `bool` is true if returned without error.
   */
  get isV2005(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === 'f98b87482f886396f52d6875083e9b201ac0e3f97d718c37613afad51e85a9b7'
  }

  /**
   *  A motion was executed; `bool` is true if returned without error.
   */
  get asV2005(): [Uint8Array, Result<null, v2005.DispatchError>] {
    assert(this.isV2005)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   * \[proposal_hash, result\]
   */
  get isV9111(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '019142f0bd31225b17a5d98473d6ee9928b1e71bb401e1e42248abdb9dca92c7'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   * \[proposal_hash, result\]
   */
  get asV9111(): [v9111.H256, Result<null, v9111.DispatchError>] {
    assert(this.isV9111)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '5b848c4d2e38fbfb6752ba650f8662bd0df106f400d22ae305ed497d7574ee03'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV9130(): {proposalHash: v9130.H256, result: Result<null, v9130.DispatchError>} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV9160(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '3f97432326c1bc7a1d2b8f8e2b864f870aa8a7a926361a7af32c8e5c45ed9c5e'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV9160(): {proposalHash: v9160.H256, result: Result<null, v9160.DispatchError>} {
    assert(this.isV9160)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV9170(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === 'e7bba992b17737087cf79037068ecde07b0ef6afb29be3ddbe1d7afe57e365aa'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV9170(): {proposalHash: v9170.H256, result: Result<null, v9170.DispatchError>} {
    assert(this.isV9170)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get isV9190(): boolean {
    return this.ctx._chain.getEventHash('council.Executed') === '891fd2ad27e5f8bc799d45bb765ef77383902fd4e1cc4c6981cba99123803ac7'
  }

  /**
   * A motion was executed; result will be `Ok` if it returned without error.
   */
  get asV9190(): {proposalHash: v9190.H256, result: Result<null, v9190.DispatchError>} {
    assert(this.isV9190)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9190
  }

  get asLatest(): {proposalHash: v9190.H256, result: Result<null, v9190.DispatchError>} {
    deprecateLatest()
    return this.asV9190
  }
}

export class CouncilProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Proposed')
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('council.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get asV1020(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('council.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV9130(): {account: v9130.AccountId32, proposalIndex: number, proposalHash: v9130.H256, threshold: number} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {account: v9130.AccountId32, proposalIndex: number, proposalHash: v9130.H256, threshold: number} {
    deprecateLatest()
    return this.asV9130
  }
}

export class CouncilVotedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'council.Voted')
  }

  /**
   *  A motion (given hash) has been voted on by given account, leaving
   *  a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('council.Voted') === '5693223b18444daea47c5d959a8026ce5084d3e9c76fe5a2be5ef93f3526e0ac'
  }

  /**
   *  A motion (given hash) has been voted on by given account, leaving
   *  a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get asV1020(): [Uint8Array, Uint8Array, boolean, number, number] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been voted on by given account, leaving
   * a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('council.Voted') === 'b69e97272b7c060192bbc1a5e91692b0a8b905727af6d9eb5627b7857ede0846'
  }

  /**
   * A motion (given hash) has been voted on by given account, leaving
   * a tally (yes votes and no votes given respectively as `MemberCount`).
   */
  get asV9130(): {account: v9130.AccountId32, proposalHash: v9130.H256, voted: boolean, yes: number, no: number} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {account: v9130.AccountId32, proposalHash: v9130.H256, voted: boolean, yes: number, no: number} {
    deprecateLatest()
    return this.asV9130
  }
}

export class DemocracyProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Proposed')
  }

  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === 'a0e51e81445baa317309351746e010ed2435e30ff7e53fbb2cf59283f3b9c536'
  }

  get asV1020(): [number, bigint] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion has been proposed by a public account.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === '02ae149915d453560f4d12074a380744b3bbb2fe4c235e963f440e2d79243477'
  }

  /**
   * A motion has been proposed by a public account.
   */
  get asV9130(): {proposalIndex: number, deposit: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {proposalIndex: number, deposit: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class DemocracyStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Started')
  }

  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '31dcae10175d30392db6fc8a872e963baae4bcf3ee28dfd38b1653a0751c031f'
  }

  get asV1020(): [number, v1020.VoteThreshold] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A referendum has begun.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '663653944bacc0e562b015a412877b12c32bc62814b673192c550438bf618ab4'
  }

  /**
   * A referendum has begun.
   */
  get asV9130(): {refIndex: number, threshold: v9130.VoteThreshold} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {refIndex: number, threshold: v9130.VoteThreshold} {
    deprecateLatest()
    return this.asV9130
  }
}

export class TechnicalCommitteeProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'technicalCommittee.Proposed')
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('technicalCommittee.Proposed') === '8d3dc2ef388c0264b2a1bd5e18788f415f4c08186c50dbbee2c60e61d81cb025'
  }

  /**
   *  A motion (given hash) has been proposed (by given account) with a threshold (given
   *  `MemberCount`).
   */
  get asV1020(): [Uint8Array, number, Uint8Array, number] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('technicalCommittee.Proposed') === '63978c884e95719fd416c8a38a2ec2ec5a691a58a28349d62b0173643f0d8262'
  }

  /**
   * A motion (given hash) has been proposed (by given account) with a threshold (given
   * `MemberCount`).
   */
  get asV9130(): {account: v9130.AccountId32, proposalIndex: number, proposalHash: v9130.H256, threshold: number} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {account: v9130.AccountId32, proposalIndex: number, proposalHash: v9130.H256, threshold: number} {
    deprecateLatest()
    return this.asV9130
  }
}

export class TreasuryProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Proposed')
  }

  /**
   *  New proposal.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
  }

  /**
   *  New proposal.
   */
  get asV1020(): number {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * New proposal.
   */
  get isV9160(): boolean {
    return this.ctx._chain.getEventHash('treasury.Proposed') === 'e9ffb62c9cf38a8abb0e419c0655e66f4415cc9c0faa1066316d07cb033b8ff6'
  }

  /**
   * New proposal.
   */
  get asV9160(): {proposalIndex: number} {
    assert(this.isV9160)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9160
  }

  get asLatest(): {proposalIndex: number} {
    deprecateLatest()
    return this.asV9160
  }
}
