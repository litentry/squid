import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9130 from './v9130'

export class TipsNewTipEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'tips.NewTip')
  }

  /**
   *  A new tip suggestion has been opened. \[tip_hash\]
   */
  get isV2028(): boolean {
    return this.ctx._chain.getEventHash('tips.NewTip') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  A new tip suggestion has been opened. \[tip_hash\]
   */
  get asV2028(): Uint8Array {
    assert(this.isV2028)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A new tip suggestion has been opened.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('tips.NewTip') === '8b10779b3fb5da73b64cdc34a9dd34ca7332ab5d36faafcef88747835b895945'
  }

  /**
   * A new tip suggestion has been opened.
   */
  get asV9130(): {tipHash: v9130.H256} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {tipHash: v9130.H256} {
    deprecateLatest()
    return this.asV9130
  }
}
