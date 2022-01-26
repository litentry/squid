import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === '3690bc952f917f777e40a3530d9836ce4ca663f50f89650418174e335b475ff9'
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get asV9010(): [Uint8Array, number, bigint] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [Uint8Array, number, bigint] {
    deprecateLatest()
    return this.asV9010
  }
}
