import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'

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
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + X' + R)`
   *    - where `X` additional-field-count (deposit-bounded and code-bounded)
   *    - where `R` judgements-count (registrar-count-bounded)
   *  - One balance reserve operation.
   *  - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('identity.set_identity') === '1394ec42e770b2d3ba889d259fe7cd80cb7a1e16187b899ec7488bd8202efde8'
  }

  /**
   *  Set an account's identity information and reserve the appropriate deposit.
   * 
   *  If the account already has identity information, the deposit is taken as part payment
   *  for the new deposit.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `info`: The identity information.
   * 
   *  Emits `IdentitySet` if successful.
   * 
   *  # <weight>
   *  - `O(X + X' + R)`
   *    - where `X` additional-field-count (deposit-bounded and code-bounded)
   *    - where `R` judgements-count (registrar-count-bounded)
   *  - One balance reserve operation.
   *  - One storage mutation (codec-read `O(X' + R)`, codec-write `O(X + R)`).
   *  - One event.
   *  # </weight>
   */
  get asV1(): {info: v1.IdentityInfo} {
    assert(this.isV1)
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
  get isV1090(): boolean {
    return this.ctx._chain.getCallHash('identity.set_identity') === '232e0869039d06c6b163a97f9833cc687e180ac9005d09e9d20ebdf8f3b7e2e0'
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
  get asV1090(): {info: v1090.IdentityInfo} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {info: v1090.IdentityInfo} {
    deprecateLatest()
    return this.asV1090
  }
}
