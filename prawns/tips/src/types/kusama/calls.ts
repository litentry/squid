import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'

export class TipsCloseTipCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.closeTip' || this.ctx.extrinsic.name === 'tips.close_tip')
  }

  /**
   *  Close and payout a tip.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  The tip identified by `hash` must have finished its countdown period.
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
   * 
   *  # <weight>
   *  - Complexity: `O(T)` where `T` is the number of tippers.
   *    decoding `Tipper` vec of length `T`.
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   *  - DbReads: `Tips`, `Tippers`, `tip finder`
   *  - DbWrites: `Reasons`, `Tips`, `Tippers`, `tip finder`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.close_tip') === '19b8576fc9fe9553b0b5ad154324ccae0d0d43fdccbdffddf2bb6066a9b37b5c'
  }

  /**
   *  Close and payout a tip.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  The tip identified by `hash` must have finished its countdown period.
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
   * 
   *  # <weight>
   *  - Complexity: `O(T)` where `T` is the number of tippers.
   *    decoding `Tipper` vec of length `T`.
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   *  - DbReads: `Tips`, `Tippers`, `tip finder`
   *  - DbWrites: `Reasons`, `Tips`, `Tippers`, `tip finder`
   *  # </weight>
   */
  get asV2028(): {hash: Uint8Array} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {hash: Uint8Array} {
    deprecateLatest()
    return this.asV2028
  }
}

export class TipsReportAwesomeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.reportAwesome' || this.ctx.extrinsic.name === 'tips.report_awesome')
  }

  /**
   *  Report something `reason` that deserves a tip and claim any eventual the finder's fee.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
   *  `DataDepositPerByte` for each byte in `reason`.
   * 
   *  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
   *    a UTF-8-encoded URL.
   *  - `who`: The account which should be credited for the tip.
   * 
   *  Emits `NewTip` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(R)` where `R` length of `reason`.
   *    - encoding and hashing of 'reason'
   *  - DbReads: `Reasons`, `Tips`
   *  - DbWrites: `Reasons`, `Tips`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.report_awesome') === '5f39cdb6a1bab5505c2717a3d34b1ad66c35bb6aca421780ce60b4e9017fe886'
  }

  /**
   *  Report something `reason` that deserves a tip and claim any eventual the finder's fee.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
   *  `DataDepositPerByte` for each byte in `reason`.
   * 
   *  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
   *    a UTF-8-encoded URL.
   *  - `who`: The account which should be credited for the tip.
   * 
   *  Emits `NewTip` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(R)` where `R` length of `reason`.
   *    - encoding and hashing of 'reason'
   *  - DbReads: `Reasons`, `Tips`
   *  - DbWrites: `Reasons`, `Tips`
   *  # </weight>
   */
  get asV2028(): {reason: Uint8Array, who: Uint8Array} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {reason: Uint8Array, who: Uint8Array} {
    deprecateLatest()
    return this.asV2028
  }
}

export class TipsRetractTipCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.retractTip' || this.ctx.extrinsic.name === 'tips.retract_tip')
  }

  /**
   *  Retract a prior tip-report from `report_awesome`, and cancel the process of tipping.
   * 
   *  If successful, the original deposit will be unreserved.
   * 
   *  The dispatch origin for this call must be _Signed_ and the tip identified by `hash`
   *  must have been reported by the signing account through `report_awesome` (and not
   *  through `tip_new`).
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
   * 
   *  Emits `TipRetracted` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(1)`
   *    - Depends on the length of `T::Hash` which is fixed.
   *  - DbReads: `Tips`, `origin account`
   *  - DbWrites: `Reasons`, `Tips`, `origin account`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.retract_tip') === '19b8576fc9fe9553b0b5ad154324ccae0d0d43fdccbdffddf2bb6066a9b37b5c'
  }

  /**
   *  Retract a prior tip-report from `report_awesome`, and cancel the process of tipping.
   * 
   *  If successful, the original deposit will be unreserved.
   * 
   *  The dispatch origin for this call must be _Signed_ and the tip identified by `hash`
   *  must have been reported by the signing account through `report_awesome` (and not
   *  through `tip_new`).
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the original tip `reason` and the beneficiary account ID.
   * 
   *  Emits `TipRetracted` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(1)`
   *    - Depends on the length of `T::Hash` which is fixed.
   *  - DbReads: `Tips`, `origin account`
   *  - DbWrites: `Reasons`, `Tips`, `origin account`
   *  # </weight>
   */
  get asV2028(): {hash: Uint8Array} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {hash: Uint8Array} {
    deprecateLatest()
    return this.asV2028
  }
}

export class TipsSlashTipCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.slashTip' || this.ctx.extrinsic.name === 'tips.slash_tip')
  }

  /**
   *  Remove and slash an already-open tip.
   * 
   *  May only be called from `T::RejectOrigin`.
   * 
   *  As a result, the finder is slashed and the deposits are lost.
   * 
   *  Emits `TipSlashed` if successful.
   * 
   *  # <weight>
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.slash_tip') === '19b8576fc9fe9553b0b5ad154324ccae0d0d43fdccbdffddf2bb6066a9b37b5c'
  }

  /**
   *  Remove and slash an already-open tip.
   * 
   *  May only be called from `T::RejectOrigin`.
   * 
   *  As a result, the finder is slashed and the deposits are lost.
   * 
   *  Emits `TipSlashed` if successful.
   * 
   *  # <weight>
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   *  # </weight>
   */
  get asV2028(): {hash: Uint8Array} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {hash: Uint8Array} {
    deprecateLatest()
    return this.asV2028
  }
}

export class TipsTipCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.tip')
  }

  /**
   *  Declare a tip value for an already-open tip.
   * 
   *  The dispatch origin for this call must be _Signed_ and the signing account must be a
   *  member of the `Tippers` set.
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the hash of the original tip `reason` and the beneficiary
   *    account ID.
   *  - `tip_value`: The amount of tip that the sender would like to give. The median tip
   *    value of active tippers will be given to the `who`.
   * 
   *  Emits `TipClosing` if the threshold of tippers has been reached and the countdown period
   *  has started.
   * 
   *  # <weight>
   *  - Complexity: `O(T)` where `T` is the number of tippers.
   *    decoding `Tipper` vec of length `T`, insert tip and check closing,
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   * 
   *    Actually weight could be lower as it depends on how many tips are in `OpenTip` but it
   *    is weighted as if almost full i.e of length `T-1`.
   *  - DbReads: `Tippers`, `Tips`
   *  - DbWrites: `Tips`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.tip') === 'f3795cdab18c292963e0e30ece37a15a2900030efc315a8e3f28ba886b2b9f58'
  }

  /**
   *  Declare a tip value for an already-open tip.
   * 
   *  The dispatch origin for this call must be _Signed_ and the signing account must be a
   *  member of the `Tippers` set.
   * 
   *  - `hash`: The identity of the open tip for which a tip value is declared. This is formed
   *    as the hash of the tuple of the hash of the original tip `reason` and the beneficiary
   *    account ID.
   *  - `tip_value`: The amount of tip that the sender would like to give. The median tip
   *    value of active tippers will be given to the `who`.
   * 
   *  Emits `TipClosing` if the threshold of tippers has been reached and the countdown period
   *  has started.
   * 
   *  # <weight>
   *  - Complexity: `O(T)` where `T` is the number of tippers.
   *    decoding `Tipper` vec of length `T`, insert tip and check closing,
   *    `T` is charged as upper bound given by `ContainsLengthBound`.
   *    The actual cost depends on the implementation of `T::Tippers`.
   * 
   *    Actually weight could be lower as it depends on how many tips are in `OpenTip` but it
   *    is weighted as if almost full i.e of length `T-1`.
   *  - DbReads: `Tippers`, `Tips`
   *  - DbWrites: `Tips`
   *  # </weight>
   */
  get asV2028(): {hash: Uint8Array, tipValue: bigint} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {hash: Uint8Array, tipValue: bigint} {
    deprecateLatest()
    return this.asV2028
  }
}

export class TipsTipNewCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'tips.tipNew' || this.ctx.extrinsic.name === 'tips.tip_new')
  }

  /**
   *  Give a tip for something new; no finder's fee will be taken.
   * 
   *  The dispatch origin for this call must be _Signed_ and the signing account must be a
   *  member of the `Tippers` set.
   * 
   *  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
   *    a UTF-8-encoded URL.
   *  - `who`: The account which should be credited for the tip.
   *  - `tip_value`: The amount of tip that the sender would like to give. The median tip
   *    value of active tippers will be given to the `who`.
   * 
   *  Emits `NewTip` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(R + T)` where `R` length of `reason`, `T` is the number of tippers.
   *    - `O(T)`: decoding `Tipper` vec of length `T`
   *      `T` is charged as upper bound given by `ContainsLengthBound`.
   *      The actual cost depends on the implementation of `T::Tippers`.
   *    - `O(R)`: hashing and encoding of reason of length `R`
   *  - DbReads: `Tippers`, `Reasons`
   *  - DbWrites: `Reasons`, `Tips`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('tips.tip_new') === '367b1dcdffb32d8c4b26e342e9b515c65f2589dec81f4a3f6f336faaa7e127ac'
  }

  /**
   *  Give a tip for something new; no finder's fee will be taken.
   * 
   *  The dispatch origin for this call must be _Signed_ and the signing account must be a
   *  member of the `Tippers` set.
   * 
   *  - `reason`: The reason for, or the thing that deserves, the tip; generally this will be
   *    a UTF-8-encoded URL.
   *  - `who`: The account which should be credited for the tip.
   *  - `tip_value`: The amount of tip that the sender would like to give. The median tip
   *    value of active tippers will be given to the `who`.
   * 
   *  Emits `NewTip` if successful.
   * 
   *  # <weight>
   *  - Complexity: `O(R + T)` where `R` length of `reason`, `T` is the number of tippers.
   *    - `O(T)`: decoding `Tipper` vec of length `T`
   *      `T` is charged as upper bound given by `ContainsLengthBound`.
   *      The actual cost depends on the implementation of `T::Tippers`.
   *    - `O(R)`: hashing and encoding of reason of length `R`
   *  - DbReads: `Tippers`, `Reasons`
   *  - DbWrites: `Reasons`, `Tips`
   *  # </weight>
   */
  get asV2028(): {reason: Uint8Array, who: Uint8Array, tipValue: bigint} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {reason: Uint8Array, who: Uint8Array, tipValue: bigint} {
    deprecateLatest()
    return this.asV2028
  }
}
