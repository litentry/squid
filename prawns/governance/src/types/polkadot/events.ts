import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v0 from './v0'
import * as v9140 from './v9140'

export class DemocracyProposedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Proposed')
  }

  /**
   *  A motion has been proposed by a public account.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === 'ec9d8411ccb58c13acecb12c4b4103b429f06983b49e7443b80c83975cb484ed'
  }

  /**
   *  A motion has been proposed by a public account.
   */
  get asV0(): [number, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A motion has been proposed by a public account.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('democracy.Proposed') === '52a3fc64bce50a0f796295d5997106abe75022e8260b5b12503c89b205774e0d'
  }

  /**
   * A motion has been proposed by a public account.
   */
  get asV9140(): {proposalIndex: number, deposit: bigint} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {proposalIndex: number, deposit: bigint} {
    deprecateLatest()
    return this.asV9140
  }
}

export class DemocracyStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'democracy.Started')
  }

  /**
   *  A referendum has begun.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '8d2e3ee24efda41975164e8978c8d4bd4db323c948fca6fc2185f7dbd5187279'
  }

  /**
   *  A referendum has begun.
   */
  get asV0(): [number, v0.VoteThreshold] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A referendum has begun.
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('democracy.Started') === '7eddfd695fafebc9154f63d976aa98302dc7e2a7f64342b386cb0ddf84367abd'
  }

  /**
   * A referendum has begun.
   */
  get asV9140(): {refIndex: number, threshold: v9140.VoteThreshold} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {refIndex: number, threshold: v9140.VoteThreshold} {
    deprecateLatest()
    return this.asV9140
  }
}
