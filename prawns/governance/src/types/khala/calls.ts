import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'
import * as v1091 from './v1091'
import * as v1100 from './v1100'
import * as v1110 from './v1110'

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
  get isV1(): boolean {
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
  get asV1(): {value: bigint, description: Uint8Array} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {value: bigint, description: Uint8Array} {
    deprecateLatest()
    return this.asV1
  }
}

export class CouncilVoteCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'council.vote')
  }

  /**
   *  Add an aye or nay vote for the sender to the given proposal.
   * 
   *  Requires the sender to be a member.
   * 
   *  Transaction fees will be waived if the member is voting on any particular proposal
   *  for the first time and the call is successful. Subsequent vote changes will charge a fee.
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('council.vote') === 'f8a1069a57f7b721f47c086d08b6838ae1a0c08f58caddb82428ba5f1407540f'
  }

  /**
   *  Add an aye or nay vote for the sender to the given proposal.
   * 
   *  Requires the sender to be a member.
   * 
   *  Transaction fees will be waived if the member is voting on any particular proposal
   *  for the first time and the call is successful. Subsequent vote changes will charge a fee.
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get asV1(): {proposal: Uint8Array, index: number, approve: boolean} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {proposal: Uint8Array, index: number, approve: boolean} {
    deprecateLatest()
    return this.asV1
  }
}

export class DemocracySecondCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.second')
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
   *  Weight: `O(S)` where S is the number of seconds a proposal already has.
   */
  get isV1(): boolean {
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
   *  Weight: `O(S)` where S is the number of seconds a proposal already has.
   */
  get asV1(): {proposal: number, secondsUpperBound: number} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {proposal: number, secondsUpperBound: number} {
    deprecateLatest()
    return this.asV1
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
   *  The dispatch origin of this call must be _Signed_.
   * 
   *  - `ref_index`: The index of the referendum to vote for.
   *  - `vote`: The vote configuration.
   * 
   *  Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get isV1(): boolean {
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
   *  Weight: `O(R)` where R is the number of referendums the voter has voted on.
   */
  get asV1(): {refIndex: number, vote: v1.AccountVote} {
    assert(this.isV1)
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
  get isV1090(): boolean {
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
  get asV1090(): {refIndex: number, vote: v1090.AccountVote} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {refIndex: number, vote: v1090.AccountVote} {
    deprecateLatest()
    return this.asV1090
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
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get isV1(): boolean {
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
   *  - DB Weight:
   *      - Reads: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *      - Writes: Multisig Storage, [Caller Account], Calls (if `store_call`)
   *  - Plus Call Weight
   *  # </weight>
   */
  get asV1(): {threshold: number, otherSignatories: Uint8Array[], maybeTimepoint: (v1.Timepoint | undefined), call: Uint8Array, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV1)
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
  get isV1090(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '7899ef807ea4c42c70474aed04d97c17e0fa5f4859ffd90fdcab8e645a086fd4'
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
  get asV1090(): {threshold: number, otherSignatories: v1090.AccountId32[], maybeTimepoint: (v1090.Timepoint | undefined), call: v1090.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV1090)
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
  get isV1091(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '31d1f8e03d60180c4b67cfd95c5455848bcd2d682daf638de0141cf947acdf8d'
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
  get asV1091(): {threshold: number, otherSignatories: v1091.AccountId32[], maybeTimepoint: (v1091.Timepoint | undefined), call: v1091.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV1091)
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
  get isV1100(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '488765ce6561807085b54f782f81bc4dc4af91ac0b956774c02e21c89d482629'
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
  get asV1100(): {threshold: number, otherSignatories: v1100.AccountId32[], maybeTimepoint: (v1100.Timepoint | undefined), call: v1100.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV1100)
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
  get isV1110(): boolean {
    return this.ctx._chain.getCallHash('multisig.as_multi') === '35c72950dea44fb195ce9053d32df4fb7a7dbd7b62d764087edf30b423aa389f'
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
  get asV1110(): {threshold: number, otherSignatories: v1110.AccountId32[], maybeTimepoint: (v1110.Timepoint | undefined), call: v1110.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    assert(this.isV1110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1110
  }

  get asLatest(): {threshold: number, otherSignatories: v1110.AccountId32[], maybeTimepoint: (v1110.Timepoint | undefined), call: v1110.WrapperKeepOpaque, storeCall: boolean, maxWeight: bigint} {
    deprecateLatest()
    return this.asV1110
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
  get isV14(): boolean {
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
  get asV14(): {votes: Uint8Array[], value: bigint} {
    assert(this.isV14)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV14
  }

  get asLatest(): {votes: Uint8Array[], value: bigint} {
    deprecateLatest()
    return this.asV14
  }
}

export class TreasuryProposeSpendCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'treasury.proposeSpend' || this.ctx.extrinsic.name === 'treasury.propose_spend')
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
  get isV1(): boolean {
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
  get asV1(): {value: bigint, beneficiary: v1.GenericMultiAddress} {
    assert(this.isV1)
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
  get isV1090(): boolean {
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
  get asV1090(): {value: bigint, beneficiary: v1090.MultiAddress} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1090
  }

  get asLatest(): {value: bigint, beneficiary: v1090.MultiAddress} {
    deprecateLatest()
    return this.asV1090
  }
}
