import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'

export class IdentityClearIdentityCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'identity.clearIdentity' || this.ctx.extrinsic.name === 'identity.clear_identity')
  }

  /**
   *  Clear an account's identity info and all sub-accounts and return all deposits.
   * 
   *  Payment: All reserved balances on the account are returned.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  Emits `IdentityCleared` if successful.
   * 
   *  # <weight>
   *  - `O(R + S + X)`
   *    - where `R` registrar-count (governance-bounded).
   *    - where `S` subs-count (hard- and deposit-bounded).
   *    - where `X` additional-field-count (deposit-bounded and code-bounded).
   *  - One balance-unreserve operation.
   *  - `2` storage reads and `S + 2` storage deletions.
   *  - One event.
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('identity.clear_identity') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Clear an account's identity info and all sub-accounts and return all deposits.
   * 
   *  Payment: All reserved balances on the account are returned.
   * 
   *  The dispatch origin for this call must be _Signed_ and the sender must have a registered
   *  identity.
   * 
   *  Emits `IdentityCleared` if successful.
   * 
   *  # <weight>
   *  - `O(R + S + X)`
   *    - where `R` registrar-count (governance-bounded).
   *    - where `S` subs-count (hard- and deposit-bounded).
   *    - where `X` additional-field-count (deposit-bounded and code-bounded).
   *  - One balance-unreserve operation.
   *  - `2` storage reads and `S + 2` storage deletions.
   *  - One event.
   *  # </weight>
   */
  get asV1(): null {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): null {
    deprecateLatest()
    return this.asV1
  }
}

export class IdentityKillIdentityCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'identity.killIdentity' || this.ctx.extrinsic.name === 'identity.kill_identity')
  }

  /**
   *  Remove an account's identity and sub-account information and slash the deposits.
   * 
   *  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   *  `Slash`. Verification request deposits are not returned; they should be cancelled
   *  manually using `cancel_request`.
   * 
   *  The dispatch origin for this call must match `T::ForceOrigin`.
   * 
   *  - `target`: the account whose identity the judgement is upon. This must be an account
   *    with a registered identity.
   * 
   *  Emits `IdentityKilled` if successful.
   * 
   *  # <weight>
   *  - `O(R + S + X)`.
   *  - One balance-reserve operation.
   *  - `S + 2` storage mutations.
   *  - One event.
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('identity.kill_identity') === 'b473bcbba83335e310f2f681307dcf6b16b8d79ec99a4fb2202c34bed7de3b65'
  }

  /**
   *  Remove an account's identity and sub-account information and slash the deposits.
   * 
   *  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   *  `Slash`. Verification request deposits are not returned; they should be cancelled
   *  manually using `cancel_request`.
   * 
   *  The dispatch origin for this call must match `T::ForceOrigin`.
   * 
   *  - `target`: the account whose identity the judgement is upon. This must be an account
   *    with a registered identity.
   * 
   *  Emits `IdentityKilled` if successful.
   * 
   *  # <weight>
   *  - `O(R + S + X)`.
   *  - One balance-reserve operation.
   *  - `S + 2` storage mutations.
   *  - One event.
   *  # </weight>
   */
  get asV1(): {target: v1.GenericMultiAddress} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Remove an account's identity and sub-account information and slash the deposits.
   * 
   * Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   * `Slash`. Verification request deposits are not returned; they should be cancelled
   * manually using `cancel_request`.
   * 
   * The dispatch origin for this call must match `T::ForceOrigin`.
   * 
   * - `target`: the account whose identity the judgement is upon. This must be an account
   *   with a registered identity.
   * 
   * Emits `IdentityKilled` if successful.
   * 
   * # <weight>
   * - `O(R + S + X)`.
   * - One balance-reserve operation.
   * - `S + 2` storage mutations.
   * - One event.
   * # </weight>
   */
  get isV1090(): boolean {
    return this.ctx._chain.getCallHash('identity.kill_identity') === '8142da248a3023c20f65ce8f6287f9eaf75336ab8815cb15537149abcdd0c20c'
  }

  /**
   * Remove an account's identity and sub-account information and slash the deposits.
   * 
   * Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   * `Slash`. Verification request deposits are not returned; they should be cancelled
   * manually using `cancel_request`.
   * 
   * The dispatch origin for this call must match `T::ForceOrigin`.
   * 
   * - `target`: the account whose identity the judgement is upon. This must be an account
   *   with a registered identity.
   * 
   * Emits `IdentityKilled` if successful.
   * 
   * # <weight>
   * - `O(R + S + X)`.
   * - One balance-reserve operation.
   * - `S + 2` storage mutations.
   * - One event.
   * # </weight>
   */
  get asV1090(): {target: v1090.MultiAddress} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {target: v1090.MultiAddress} {
    deprecateLatest()
    return this.asV1090
  }
}

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
    return this.ctx._chain.getCallHash('identity.set_identity') === '2063615d32349aa9ca40a1c1a96c2179846748123f5550ae994de72a71436a80'
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
