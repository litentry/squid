import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1020 from './v1020'
import * as v9130 from './v9130'

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
