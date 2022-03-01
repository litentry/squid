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
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'd943dbc2818504a7c969bb6b64a01f7217f0321441ab3f4ec6efeed498414ca4'
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
