import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1055 from './v1055'
import * as v9111 from './v9111'

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
    return this.ctx._chain.getCallHash('democracy.vote') === '3a257842e5409d1ef798e72ec85e594b5abcb8e5073d74d987db05365764b7a0'
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
    return this.ctx._chain.getCallHash('democracy.vote') === '99c87c2462eae0050bd7a29171838d7c9d7b88f3bc9c600dc60b8d304a9c85dc'
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
    return this.ctx._chain.getCallHash('democracy.vote') === '0efe1fcbb98d2fc487ae2000c67d643ca2393fcf25703010de5a67225e5a4ecd'
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
