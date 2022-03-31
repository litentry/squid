import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'

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
