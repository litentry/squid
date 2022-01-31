import assert from 'assert'
import {EventContext, Result} from './support'
import * as v9110 from './v9110'

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get isLatest(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === '3690bc952f917f777e40a3530d9836ce4ca663f50f89650418174e335b475ff9'
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get asLatest(): [v9110.AccountId32, v9110.Id, bigint] {
    assert(this.isLatest)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }
}
