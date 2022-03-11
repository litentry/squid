import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'

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
