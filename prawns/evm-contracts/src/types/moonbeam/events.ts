import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v900 from './v900'

export class EvmExecutedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'evm.Executed')
  }

  /**
   * A \[contract\] has been executed successfully with states applied.
   */
  get isV900(): boolean {
    return this.ctx._chain.getEventHash('evm.Executed') === '263836b99b4a45459815602ace314f34df99d42115f23bfc582aed341d792cad'
  }

  /**
   * A \[contract\] has been executed successfully with states applied.
   */
  get asV900(): v900.H160 {
    assert(this.isV900)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV900
  }

  get asLatest(): v900.H160 {
    deprecateLatest()
    return this.asV900
  }
}
