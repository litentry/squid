import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1030 from './v1030'
import * as v1032 from './v1032'
import * as v9111 from './v9111'

export class IdentitySetIdentityCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'identity.setIdentity' || this.ctx.extrinsic.name === 'identity.set_identity')
  }

  /**
   *  Set an account's identity information and reserve the appropriate deposit.
   * 
   *  If the account already has identity information, the deposit is taken as part payment
   *  for the new deposit.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + R)` where `X` additional-field-count (deposit-bounded).
   *  - At most two balance operations.
   *  - One storage mutation (codec `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get isV1030(): boolean {
    return this.ctx._chain.getCallHash('identity.set_identity') === 'a060784612d57c64e9c673b4ccefecf1855c35b197cd14d200d782950b1536e7'
  }

  /**
   *  Set an account's identity information and reserve the appropriate deposit.
   * 
   *  If the account already has identity information, the deposit is taken as part payment
   *  for the new deposit.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + R)` where `X` additional-field-count (deposit-bounded).
   *  - At most two balance operations.
   *  - One storage mutation (codec `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get asV1030(): {info: v1030.IdentityInfoTo198} {
    assert(this.isV1030)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Set an account's identity information and reserve the appropriate deposit.
   * 
   *  If the account already has identity information, the deposit is taken as part payment
   *  for the new deposit.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + R)` where `X` additional-field-count (deposit-bounded).
   *  - At most two balance operations.
   *  - One storage mutation (codec `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get isV1032(): boolean {
    return this.ctx._chain.getCallHash('identity.set_identity') === '2063615d32349aa9ca40a1c1a96c2179846748123f5550ae994de72a71436a80'
  }

  /**
   *  Set an account's identity information and reserve the appropriate deposit.
   * 
   *  If the account already has identity information, the deposit is taken as part payment
   *  for the new deposit.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + R)` where `X` additional-field-count (deposit-bounded).
   *  - At most two balance operations.
   *  - One storage mutation (codec `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get asV1032(): {info: v1032.IdentityInfo} {
    assert(this.isV1032)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Set an account's identity information and reserve the appropriate deposit.
   * 
   * If the account already has identity information, the deposit is taken as part payment
   * for the new deposit.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `info`: The identity information.
   * 
   * Emits `IdentitySet` if successful.
   * 
   * # <weight>
   * - `O(X + X' + R)`
   *   - where `X` additional-field-count (deposit-bounded and code-bounded)
   *   - where `R` judgements-count (registrar-count-bounded)
   * - One balance reserve operation.
   * - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
   * - One event.
   * # </weight>
   */
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('identity.set_identity') === 'ab457704fd8cda5fee32e84ab7782778f4117cd54400c364cf7597eee5bc60ca'
  }

  /**
   * Set an account's identity information and reserve the appropriate deposit.
   * 
   * If the account already has identity information, the deposit is taken as part payment
   * for the new deposit.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `info`: The identity information.
   * 
   * Emits `IdentitySet` if successful.
   * 
   * # <weight>
   * - `O(X + X' + R)`
   *   - where `X` additional-field-count (deposit-bounded and code-bounded)
   *   - where `R` judgements-count (registrar-count-bounded)
   * - One balance reserve operation.
   * - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
   * - One event.
   * # </weight>
   */
  get asV9111(): {info: v9111.IdentityInfo} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {info: v9111.IdentityInfo} {
    deprecateLatest()
    return this.asV9111
  }
}
