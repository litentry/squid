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
    return this.ctx._chain.getEventHash('democracy.Proposed') === 'ec9d8411ccb58c13acecb12c4b4103b429f06983b49e7443b80c83975cb484ed'
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
    return this.ctx._chain.getEventHash('democracy.Proposed') === '52a3fc64bce50a0f796295d5997106abe75022e8260b5b12503c89b205774e0d'
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
    return this.ctx._chain.getEventHash('democracy.Started') === '8d2e3ee24efda41975164e8978c8d4bd4db323c948fca6fc2185f7dbd5187279'
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
    return this.ctx._chain.getEventHash('democracy.Started') === '7eddfd695fafebc9154f63d976aa98302dc7e2a7f64342b386cb0ddf84367abd'
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
