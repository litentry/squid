import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result} from './support'
import * as v5 from './v5'
import * as v28 from './v28'
import * as v9110 from './v9110'

export class IdentityClearIdentityCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Identity.clear_identity')
    this._chain = ctx._chain
    this.call = call
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
  get isV5(): boolean {
    return this._chain.getCallHash('Identity.clear_identity') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
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
  get asV5(): null {
    assert(this.isV5)
    return this._chain.decodeCall(this.call)
  }
}

export class IdentityKillIdentityCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Identity.kill_identity')
    this._chain = ctx._chain
    this.call = call
  }

  /**
   *  Remove an account's identity and sub-account information and slash the deposits.
   * 
   *  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   *  `Slash`. Verification request deposits are not returned; they should be cancelled
   *  manually using `cancel_request`.
   * 
   *  The dispatch origin for this call must be _Root_ or match `T::ForceOrigin`.
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
  get isV5(): boolean {
    return this._chain.getCallHash('Identity.kill_identity') === '66d8abf7976ff596d8d614948b9d84cb24f0b898d88d24eb2cc035ae5e93c7b8'
  }

  /**
   *  Remove an account's identity and sub-account information and slash the deposits.
   * 
   *  Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
   *  `Slash`. Verification request deposits are not returned; they should be cancelled
   *  manually using `cancel_request`.
   * 
   *  The dispatch origin for this call must be _Root_ or match `T::ForceOrigin`.
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
  get asV5(): {target: Uint8Array} {
    assert(this.isV5)
    return this._chain.decodeCall(this.call)
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
  get isV28(): boolean {
    return this._chain.getCallHash('Identity.kill_identity') === 'b473bcbba83335e310f2f681307dcf6b16b8d79ec99a4fb2202c34bed7de3b65'
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
  get asV28(): {target: v28.LookupSource} {
    assert(this.isV28)
    return this._chain.decodeCall(this.call)
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
  get isV9110(): boolean {
    return this._chain.getCallHash('Identity.kill_identity') === '8142da248a3023c20f65ce8f6287f9eaf75336ab8815cb15537149abcdd0c20c'
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
  get asV9110(): {target: v9110.MultiAddress} {
    assert(this.isV9110)
    return this._chain.decodeCall(this.call)
  }
}

export class IdentitySetIdentityCall {
  private readonly _chain: Chain
  private readonly call: Call

  constructor(ctx: CallContext)
  constructor(ctx: ChainContext, call: Call)
  constructor(ctx: CallContext, call?: Call) {
    call = call || ctx.call
    assert(call.name === 'Identity.set_identity')
    this._chain = ctx._chain
    this.call = call
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
  get isV5(): boolean {
    return this._chain.getCallHash('Identity.set_identity') === '2063615d32349aa9ca40a1c1a96c2179846748123f5550ae994de72a71436a80'
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
  get asV5(): {info: v5.IdentityInfo} {
    assert(this.isV5)
    return this._chain.decodeCall(this.call)
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
  get isV9110(): boolean {
    return this._chain.getCallHash('Identity.set_identity') === 'ab457704fd8cda5fee32e84ab7782778f4117cd54400c364cf7597eee5bc60ca'
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
  get asV9110(): {info: v9110.IdentityInfo} {
    assert(this.isV9110)
    return this._chain.decodeCall(this.call)
  }
}
