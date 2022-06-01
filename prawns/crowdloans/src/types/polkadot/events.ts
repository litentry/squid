import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9110 from './v9110'

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get isV9110(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'ad00729b31f26d2879a6f96c1691ed42a69cd4947c75e84221a6bde93a3415bc'
  }

  /**
   * Contributed to a crowd sale. `[who, fund_index, amount]`
   */
  get asV9110(): [v9110.AccountId32, v9110.Id, bigint] {
    assert(this.isV9110)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): [v9110.AccountId32, v9110.Id, bigint] {
    deprecateLatest()
    return this.asV9110
  }
}
