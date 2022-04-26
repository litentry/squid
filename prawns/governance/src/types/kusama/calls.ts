import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1055 from './v1055'
import * as v2005 from './v2005'
import * as v2007 from './v2007'
import * as v2011 from './v2011'
import * as v2028 from './v2028'
import * as v9111 from './v9111'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
import * as v9170 from './v9170'

export class BountiesProposeBountyCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'bounties.proposeBounty' || this.ctx.extrinsic.name === 'bounties.propose_bounty')
  }

  /**
   *  Propose a new bounty.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
   *  `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
   *  or slashed when rejected.
   * 
   *  - `curator`: The curator account whom will manage this bounty.
   *  - `fee`: The curator fee.
   *  - `value`: The total payment amount of this bounty, curator fee included.
   *  - `description`: The description of this bounty.
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('bounties.propose_bounty') === '6a012b4069a991972d0d3268cb20dfba3163919c325c7ebbe980b2dc15f1b1f5'
  }

  /**
   *  Propose a new bounty.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
   *  `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
   *  or slashed when rejected.
   * 
   *  - `curator`: The curator account whom will manage this bounty.
   *  - `fee`: The curator fee.
   *  - `value`: The total payment amount of this bounty, curator fee included.
   *  - `description`: The description of this bounty.
   */
  get asV2028(): {value: bigint, description: Uint8Array} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2028
  }

  get asLatest(): {value: bigint, description: Uint8Array} {
    deprecateLatest()
    return this.asV2028
  }
}

export class CouncilVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'council.vote')
  }

  /**
   *  # <weight>
   *  - Bounded storage read and writes.
   *  - Will be slightly heavier if the proposal is approved / disapproved after the vote.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('council.vote') === 'f8a1069a57f7b721f47c086d08b6838ae1a0c08f58caddb82428ba5f1407540f'
  }

  /**
   *  # <weight>
   *  - Bounded storage read and writes.
   *  - Will be slightly heavier if the proposal is approved / disapproved after the vote.
   *  # </weight>
   */
  get asV1020(): {proposal: Uint8Array, index: number, approve: boolean} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): {proposal: Uint8Array, index: number, approve: boolean} {
    deprecateLatest()
    return this.asV1020
  }
}

export class DemocracySecondCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.second')
  }

  /**
   *  Propose a sensitive action to be taken.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('democracy.second') === '7ac80a800d6686f21181e7b5b45c8949dc5b807bc6ec111188c7c6850a21b898'
  }

  /**
   *  Propose a sensitive action to be taken.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB entry.
   *  # </weight>
   */
  get asV1020(): {proposal: number} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Signals agreement with a particular proposal.
   * 
   *  The dispatch origin of this call must be _Signed_ and the sender
   *  must have funds to cover the deposit, equal to the original deposit.
   * 
   *  - `proposal`: The index of the proposal to second.
   *  - `seconds_upper_bound`: an upper bound on the current number of seconds on this
   *    proposal. Extrinsic is weighted according to this value with no refund.
   * 
   *  # <weight>
   *  - Complexity: `O(S)` where S is the number of seconds a proposal already has.
   *  - Db reads: `DepositOf`
   *  - Db writes: `DepositOf`
   *  ---------
   *  - Base Weight: 22.28 + .229 * S µs
   *  # </weight>
   */
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('democracy.second') === 'abe1357aae784eefd21f6999076deb6cfbc92fcb9e80c21e93a944ceb739423c'
  }

  /**
   *  Signals agreement with a particular proposal.
   * 
   *  The dispatch origin of this call must be _Signed_ and the sender
   *  must have funds to cover the deposit, equal to the original deposit.
   * 
   *  - `proposal`: The index of the proposal to second.
   *  - `seconds_upper_bound`: an upper bound on the current number of seconds on this
   *    proposal. Extrinsic is weighted according to this value with no refund.
   * 
   *  # <weight>
   *  - Complexity: `O(S)` where S is the number of seconds a proposal already has.
   *  - Db reads: `DepositOf`
   *  - Db writes: `DepositOf`
   *  ---------
   *  - Base Weight: 22.28 + .229 * S µs
   *  # </weight>
   */
  get asV2005(): {proposal: number, secondsUpperBound: number} {
    assert(this.isV2005)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2005
  }

  get asLatest(): {proposal: number, secondsUpperBound: number} {
    deprecateLatest()
    return this.asV2005
  }
}

export class DemocracyVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.vote')
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('democracy.vote') === '3a01fd8d5e95145a311b99cf21decce5be8578650f311f3a6091395407f5efe9'
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  # <weight>
   *  - O(1).
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get asV1020(): {refIndex: number, vote: number} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  # <weight>
   *  - `O(1)`.
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get isV1055(): boolean {
    return this.ctx._chain.getCallHash('democracy.vote') === '6cdb35b5ffcb74405cdf222b0cc0bf7ad7025d59f676bea6712d77bcc9aff1db'
  }

  /**
   *  Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   *  otherwise it is a vote to keep the status quo.
   * 
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  # <weight>
   *  - `O(1)`.
   *  - One DB change, one DB entry.
   *  # </weight>
   */
  get asV1055(): {refIndex: number, vote: v1055.AccountVote} {
    assert(this.isV1055)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('democracy.vote') === '3936a4cb49f77280bd94142d4ec458afcf5cb8a5e5b0d602b1b1530928021e28'
  }

  /**
   * Vote in a referendum. If `vote.is_aye()`, the vote is to enact the proposal;
   * otherwise it is a vote to keep the status quo.
   * 
   * The dispatch origin of this call must be _Signed_.
   * 
   * - `ref_index`: The index of the referendum to vote for.
   * - `vote`: The vote configuration.
   * 
   * Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get asV9111(): {refIndex: number, vote: v9111.AccountVote} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {refIndex: number, vote: v9111.AccountVote} {
    deprecateLatest()
    return this.asV9111
  }
}

export class MultisigAsMultiCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'multisig.asMulti' || this.ctx.extrinsic.name === 'multisig.as_multi')
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '703955ab5bea3c39aa8702f98c9ae62a3d35b3ac4784f37ab8da27f7874142eb'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV2005(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2005.Timepoint | undefined), call: v2005.Type_172} {
    assert(this.isV2005)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV2007(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'fc380a633b5123c68c0b1369d339cec72b9f3d805317f88719e86faa1a9bd9c3'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call. Calls must each fulfil the `IsCallable`
   *  filter.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create: 46.55 + 0.089 * S µs
   *      - Approve: 34.03 + .112 * S µs
   *      - Complete: 40.36 + .225 * S µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account]
   *      - Writes: Multisig Storage, [Caller Account]
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV2007(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2007.Timepoint | undefined), call: v2007.Type_173} {
    assert(this.isV2007)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create:          41.89 + 0.118 * S + .002 * Z µs
   *      - Create w/ Store: 53.57 + 0.119 * S + .003 * Z µs
   *      - Approve:         31.39 + 0.136 * S + .002 * Z µs
   *      - Complete:        39.94 + 0.26  * S + .002 * Z µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV2011(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '548dea53ff79fe99438cf591950a533c93f9772d03a3995ec72a80376fcae222'
  }

  /**
   *  Register approval for a dispatch to be made from a deterministic composite account if
   *  approved by a total of `threshold - 1` of `other_signatories`.
   * 
   *  If there are enough, then dispatch the call.
   * 
   *  Payment: `DepositBase` will be reserved if this is the first approval, plus
   *  `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   *  is cancelled.
   * 
   *  The dispatch origin for this call must be _Signed_.
   * 
   *  - `threshold`: The total number of approvals for this dispatch before it is executed.
   *  - `other_signatories`: The accounts (other than the sender) who can approve this
   *  dispatch. May not be empty.
   *  - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   *  not the first approval, then it must be `Some`, with the timepoint (block number and
   *  transaction index) of the first approval transaction.
   *  - `call`: The call to be executed.
   * 
   *  NOTE: Unless this is the final approval, you will generally want to use
   *  `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   *  Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   *  on success, result is `Ok` and the result from the interior call, if it was executed,
   *  may be found in the deposited `MultisigExecuted` event.
   * 
   *  # <weight>
   *  - `O(S + Z + Call)`.
   *  - Up to one balance-reserve or unreserve operation.
   *  - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *    signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   *  - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   *  - One encode & hash, both of complexity `O(S)`.
   *  - Up to one binary search and insert (`O(logS + S)`).
   *  - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   *  - One event.
   *  - The weight of the `call`.
   *  - Storage: inserts one item, value size bounded by `MaxSignatories`, with a
   *    deposit taken for its lifetime of
   *    `DepositBase + threshold * DepositFactor`.
   *  -------------------------------
   *  - Base Weight:
   *      - Create:          41.89 + 0.118 * S + .002 * Z µs
   *      - Create w/ Store: 53.57 + 0.119 * S + .003 * Z µs
   *      - Approve:         31.39 + 0.136 * S + .002 * Z µs
   *      - Complete:        39.94 + 0.26  * S + .002 * Z µs
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV2011(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v2011.Timepoint | undefined), call: Uint8Array, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV2011)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9130(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'c652655a56fb4ed503865bed47ee37506b21c10fb431ace2945a5f61f6f9bf81'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9130(): {threshold: number, otherSignatories: v9130.AccountId32[], maybeTimepoint: (v9130.Timepoint | undefined), call: v9130.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9160(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'e2ebb3af4965f706b6631021bbbf47961c49c8b76f2f7ea46b88f5fec771f1d1'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9160(): {threshold: number, otherSignatories: v9160.AccountId32[], maybeTimepoint: (v9160.Timepoint | undefined), call: v9160.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9160)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get isV9170(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === 'f34e1dd8131b263e2dda0202c8e003011afd729c16a11a1f363d336abda592f3'
  }

  /**
   * Register approval for a dispatch to be made from a deterministic composite account if
   * approved by a total of `threshold - 1` of `other_signatories`.
   * 
   * If there are enough, then dispatch the call.
   * 
   * Payment: `DepositBase` will be reserved if this is the first approval, plus
   * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
   * is cancelled.
   * 
   * The dispatch origin for this call must be _Signed_.
   * 
   * - `threshold`: The total number of approvals for this dispatch before it is executed.
   * - `other_signatories`: The accounts (other than the sender) who can approve this
   * dispatch. May not be empty.
   * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
   * not the first approval, then it must be `Some`, with the timepoint (block number and
   * transaction index) of the first approval transaction.
   * - `call`: The call to be executed.
   * 
   * NOTE: Unless this is the final approval, you will generally want to use
   * `approve_as_multi` instead, since it only requires a hash of the call.
   * 
   * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
   * on success, result is `Ok` and the result from the interior call, if it was executed,
   * may be found in the deposited `MultisigExecuted` event.
   * 
   * # <weight>
   * - `O(S + Z + Call)`.
   * - Up to one balance-reserve or unreserve operation.
   * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
   *   signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
   * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
   * - One encode & hash, both of complexity `O(S)`.
   * - Up to one binary search and insert (`O(logS + S)`).
   * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
   * - One event.
   * - The weight of the `call`.
   * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
   *   taken for its lifetime of `DepositBase + threshold * DepositFactor`.
   * -------------------------------
   * - DB Weight:
   *     - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *     - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   * - Plus Call Weight
   * # </weight>
   */
  get asV9170(): {threshold: number, otherSignatories: v9170.AccountId32[], maybeTimepoint: (v9170.Timepoint | undefined), call: v9170.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV9170)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9170
  }

  get asLatest(): {threshold: number, otherSignatories: v9170.AccountId32[], maybeTimepoint: (v9170.Timepoint | undefined), call: v9170.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    deprecateLatest()
    return this.asV9170
  }
}

export class PhragmenElectionVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'phragmenElection.vote')
  }

  /**
   *  Vote for a set of candidates for the upcoming round of election. This can be called to
   *  set the initial votes, or update already existing votes.
   * 
   *  Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is
   *  reserved. The deposit is based on the number of votes and can be updated over time.
   * 
   *  The `votes` should:
   *    - not be empty.
   *    - be less than the number of possible candidates. Note that all current members and
   *      runners-up are also automatically candidates for the next round.
   * 
   *  If `value` is more than `who`'s total balance, then the maximum of the two is used.
   * 
   *  The dispatch origin of this call must be signed.
   * 
   *  ### Warning
   * 
   *  It is the responsibility of the caller to **NOT** place all of their balance into the
   *  lock and keep some for further operations.
   * 
   *  # <weight>
   *  We assume the maximum weight among all 3 cases: vote_equal, vote_more and vote_less.
   *  # </weight>
   */
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('phragmenElection.vote') === '75939c25de1c96145b5d2d4bc8627a3fc22299f0e1f1f6f0709e54e884796bda'
  }

  /**
   *  Vote for a set of candidates for the upcoming round of election. This can be called to
   *  set the initial votes, or update already existing votes.
   * 
   *  Upon initial voting, `value` units of `who`'s balance is locked and a deposit amount is
   *  reserved. The deposit is based on the number of votes and can be updated over time.
   * 
   *  The `votes` should:
   *    - not be empty.
   *    - be less than the number of possible candidates. Note that all current members and
   *      runners-up are also automatically candidates for the next round.
   * 
   *  If `value` is more than `who`'s total balance, then the maximum of the two is used.
   * 
   *  The dispatch origin of this call must be signed.
   * 
   *  ### Warning
   * 
   *  It is the responsibility of the caller to **NOT** place all of their balance into the
   *  lock and keep some for further operations.
   * 
   *  # <weight>
   *  We assume the maximum weight among all 3 cases: vote_equal, vote_more and vote_less.
   *  # </weight>
   */
  get asV9010(): {votes: Uint8Array[], value: bigint} {
    assert(this.isV9010)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): {votes: Uint8Array[], value: bigint} {
    deprecateLatest()
    return this.asV9010
  }
}

export class TreasuryProposeSpendCall {
  constructor(private ctx: CallContext) {
    console.log(ctx.extrinsic.name);
    assert(this.ctx.extrinsic.name === 'treasury.proposeSpend' || this.ctx.extrinsic.name === 'treasury.propose_spend')
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - O(1).
   *  - Limited storage reads.
   *  - One DB change, one extra DB entry.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === 'd3901783e7ffe7cbf936f14df5ea28956c53356275248ae4f7a803fe5a6018ff'
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - O(1).
   *  - Limited storage reads.
   *  - One DB change, one extra DB entry.
   *  # </weight>
   */
  get asV1020(): {value: bigint, beneficiary: never} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - O(1).
   *  - Limited storage reads.
   *  - One DB change, one extra DB entry.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === '98e9af32f46010396e58ac70ce7c017f7e95d81b05c03d5e5aeb94ce27732909'
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - O(1).
   *  - Limited storage reads.
   *  - One DB change, one extra DB entry.
   *  # </weight>
   */
  get asV1050(): {value: bigint, beneficiary: Uint8Array} {
    assert(this.isV1050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === 'c9f0fb5ad91e84a77c5f948f4140d239e238788ae3191c594dc1e6592472d5a7'
  }

  /**
   *  Put forward a suggestion for spending. A deposit proportional to the value
   *  is reserved and slashed if the proposal is rejected. It is returned once the
   *  proposal is awarded.
   * 
   *  # <weight>
   *  - Complexity: O(1)
   *  - DbReads: `ProposalCount`, `origin account`
   *  - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   *  # </weight>
   */
  get asV2028(): {value: bigint, beneficiary: v2028.GenericMultiAddress} {
    assert(this.isV2028)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Put forward a suggestion for spending. A deposit proportional to the value
   * is reserved and slashed if the proposal is rejected. It is returned once the
   * proposal is awarded.
   * 
   * # <weight>
   * - Complexity: O(1)
   * - DbReads: `ProposalCount`, `origin account`
   * - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   * # </weight>
   */
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === 'ffef9f31e8ae5085e7c0a55a685daef52218f0bf7083015ac904dafceedf09ee'
  }

  /**
   * Put forward a suggestion for spending. A deposit proportional to the value
   * is reserved and slashed if the proposal is rejected. It is returned once the
   * proposal is awarded.
   * 
   * # <weight>
   * - Complexity: O(1)
   * - DbReads: `ProposalCount`, `origin account`
   * - DbWrites: `ProposalCount`, `Proposals`, `origin account`
   * # </weight>
   */
  get asV9111(): {value: bigint, beneficiary: v9111.MultiAddress} {
    assert(this.isV9111)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9111
  }

  get asLatest(): {value: bigint, beneficiary: v9111.MultiAddress} {
    deprecateLatest()
    return this.asV9111
  }
}
