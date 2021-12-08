import {create} from './_registry'
import {AccountId32} from '@polkadot/types/interfaces'
import {SubstrateEvent} from '@subsquid/hydra-common'

export namespace Identity {
  /**
   * A name was set or reset (which will remove all judgements). \[who\]
   */
  export class IdentitySetEvent {
    constructor(private event: SubstrateEvent) {}

    get params(): [AccountId32] {
      return [create('AccountId32', this.event.params[0].value)]
    }
  }

}
