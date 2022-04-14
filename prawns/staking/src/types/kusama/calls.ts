import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v2028 from './v2028'
import * as v9111 from './v9111'

export class StakingNominateCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'staking.nominate')
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === 'a49fa0871cf33c1a976f6ab6b1e67617f73315e283ec7354119fc7467ac950ec'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1020(): {targets: never[]} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === '730fc5a4090c1c566ea6d11126ba7258c98a461b0c6bfca8bf9e17e42f8801de'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets`,
   *  which is capped at `MAX_NOMINATIONS`.
   *  - Both the reads and writes follow a similar pattern.
   *  # </weight>
   */
  get asV1050(): {targets: Uint8Array[]} {
    assert(this.isV1050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === 'a653cde167810e73479047a5ef0738fdd0dc4e9afa5b310a19c8335e4378f706'
  }

  /**
   *  Declare the desire to nominate `targets` for the origin controller.
   * 
   *  Effects will be felt at the beginning of the next era. This can only be called when
   *  [`EraElectionStatus`] is `Closed`.
   * 
   *  The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   *  And, it can be only called when [`EraElectionStatus`] is `Closed`.
   * 
   *  # <weight>
   *  - The transaction's complexity is proportional to the size of `targets` (N)
   *  which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   *  - Both the reads and writes follow a similar pattern.
   *  ---------
   *  Weight: O(N)
   *  where N is the number of targets
   *  DB Weight:
   *  - Reads: Era Election Status, Ledger, Current Era
   *  - Writes: Validators, Nominators
   *  # </weight>
   */
  get asV2028(): {targets: v2028.GenericMultiAddress[]} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('staking.nominate') === '4b7eca27044655bd9da5cc614a4bf774babc00decbed9ca59d95298b300d72de'
  }

  /**
   * Declare the desire to nominate `targets` for the origin controller.
   * 
   * Effects will be felt at the beginning of the next era.
   * 
   * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
   * 
   * # <weight>
   * - The transaction's complexity is proportional to the size of `targets` (N)
   * which is capped at CompactAssignments::LIMIT (MAX_NOMINATIONS).
   * - Both the reads and writes follow a similar pattern.
   * # </weight>
   */
  get asV9111(): {targets: v9111.MultiAddress[]} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {targets: v9111.MultiAddress[]} {
    deprecateLatest()
    return this.asV9111
  }
}
