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
    return this.ctx._chain.getCallHash('identity.set_identity') === 'dbb2cdcb75c723d58697e2c6a1598aafcfb49c7a13f3ee65e985534ca360ed0e'
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
    return this.ctx._chain.getCallHash('identity.set_identity') === '1394ec42e770b2d3ba889d259fe7cd80cb7a1e16187b899ec7488bd8202efde8'
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
