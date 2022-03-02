import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9140 from './v9140'

export class IdentityIdentitySetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'identity.IdentitySet')
  }

  /**
   *  A name was set or reset (which will remove all judgements).
   */
  get isV5(): boolean {
    return this.ctx._chain.getEventHash('identity.IdentitySet') === 'd70547d4cddb239c63f8cdb2be0c0ec99092ba078e3e4ec0fc4eeb842d7e43f4'
  }

  /**
   *  A name was set or reset (which will remove all judgements).
   */
  get asV5(): Uint8Array {
    assert(this.isV5)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A name was set or reset (which will remove all judgements).
   */
  get isV9140(): boolean {
    return this.ctx._chain.getEventHash('identity.IdentitySet') === '2786953997369f46cd44e423ade26ca4256d16937d4453060eaf5ec446f6fca9'
  }

  /**
   * A name was set or reset (which will remove all judgements).
   */
  get asV9140(): {who: v9140.AccountId32} {
    assert(this.isV9140)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9140
  }

  get asLatest(): {who: v9140.AccountId32} {
    deprecateLatest()
    return this.asV9140
  }
}
