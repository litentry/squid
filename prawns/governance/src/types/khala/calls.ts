import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1 from './v1'
import * as v10 from './v10'
import * as v1040 from './v1040'
import * as v1060 from './v1060'
import * as v1070 from './v1070'
import * as v1090 from './v1090'
import * as v1091 from './v1091'
import * as v1100 from './v1100'
import * as v1110 from './v1110'
import * as v1120 from './v1120'
import * as v1130 from './v1130'
import * as v1140 from './v1140'
import * as v1150 from './v1150'
import * as v1160 from './v1160'
import * as v14 from './v14'
import * as v5 from './v5'

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

export class CouncilProposeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'council.propose')
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'c45fd06f56032bc14bda45990020299a613f6ce379180dda6f0812b88c9ffe2f'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV1(): {threshold: number, proposal: v1.Type_166, lengthBound: number} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV5(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '96a94236cb24ff9ea1a643b9df87d9eab7bb2390c1705381d339980abb24fbeb'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV5(): {threshold: number, proposal: v5.Type_165, lengthBound: number} {
    assert(this.isV5)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV10(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'ed6de270ba21c267d2e1a6a8c9d445e1bffafc1470520d3795f68ade4522f9ae'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV10(): {threshold: number, proposal: v10.Type_165, lengthBound: number} {
    assert(this.isV10)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV14(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'de135afb389e724c53f7a1d7258dc56a1b04aebd1250dcefe31c0eb344a0dd19'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV14(): {threshold: number, proposal: v14.Type_165, lengthBound: number} {
    assert(this.isV14)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV1040(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '3d0030bc4984355b946026fcec0bbd950fa93b1a50166487f5602d528f8d1bd3'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV1040(): {threshold: number, proposal: v1040.Type_165, lengthBound: number} {
    assert(this.isV1040)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV1060(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '0862ec20cc0528d3b8f7ad1eb5800b5d3ff16d56721e7a5a331a1c3afc443324'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV1060(): {threshold: number, proposal: v1060.Type_165, lengthBound: number} {
    assert(this.isV1060)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get isV1070(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '81fb05a39c23f52040bac7f2a7519f921f83f380cf0a06c0397f616a050fec40'
  }

  /**
   *  Add a new proposal to either be voted on or executed directly.
   * 
   *  Requires the sender to be member.
   * 
   *  `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   *  or put up for voting.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(B + M + P1)` or `O(B + M + P2)` where:
   *    - `B` is `proposal` size in bytes (length-fee-bounded)
   *    - `M` is members-count (code- and governance-bounded)
   *    - branching is influenced by `threshold` where:
   *      - `P1` is proposal execution complexity (`threshold < 2`)
   *      - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   *  - DB:
   *    - 1 storage read `is_member` (codec `O(M)`)
   *    - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *    - DB accesses influenced by `threshold`:
   *      - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *      - OR proposal insertion (`threshold <= 2`)
   *        - 1 storage mutation `Proposals` (codec `O(P2)`)
   *        - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *        - 1 storage write `ProposalOf` (codec `O(B)`)
   *        - 1 storage write `Voting` (codec `O(M)`)
   *    - 1 event
   *  # </weight>
   */
  get asV1070(): {threshold: number, proposal: v1070.Type_165, lengthBound: number} {
    assert(this.isV1070)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1090(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '97293d912a4650a82efac453b169c3ccb4104400288d3b323ccb67f43b22bc84'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1090(): {threshold: number, proposal: v1090.Call, lengthBound: number} {
    assert(this.isV1090)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1091(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'ac32cc95f84d8bbcfe65569ba54a0558690bc4d8125fa19ce744a2af03cddd51'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1091(): {threshold: number, proposal: v1091.Call, lengthBound: number} {
    assert(this.isV1091)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1100(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '59bb74d8532f08899b35e8161ebe3286b3ae3b7d801b284f380502d2ab01483d'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1100(): {threshold: number, proposal: v1100.Call, lengthBound: number} {
    assert(this.isV1100)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1110(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'ca14c4ea0ea1f76d2cd832a6afffaac29ff1eac767e930444854bfb6d98bce9e'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1110(): {threshold: number, proposal: v1110.Call, lengthBound: number} {
    assert(this.isV1110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1120(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e435b6805158179cdce6f18aa5fb429c6d6d8ea42e98215d112dd4a19ae0f7b7'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1120(): {threshold: number, proposal: v1120.Call, lengthBound: number} {
    assert(this.isV1120)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1130(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '4f0c789e368dce9a121b1ee70530785d00f44dcc4966f09c0889fa3797839bf5'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1130(): {threshold: number, proposal: v1130.Call, lengthBound: number} {
    assert(this.isV1130)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1140(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'eaa581eef6c74a801fb4a909d243ce9b668414e1380c890d66acfaaf8a86ea51'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1140(): {threshold: number, proposal: v1140.Call, lengthBound: number} {
    assert(this.isV1140)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1150(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '15a6b31b5e9e9fa410cecaca43a03123d444aaa4937319125418156762244266'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1150(): {threshold: number, proposal: v1150.Call, lengthBound: number} {
    assert(this.isV1150)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get isV1160(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '2594727b55b923126d4c10e87055e78733b40b3e45e7fc656dec2543b31314df'
  }

  /**
   * Add a new proposal to either be voted on or executed directly.
   * 
   * Requires the sender to be member.
   * 
   * `threshold` determines whether `proposal` is executed directly (`threshold < 2`)
   * or put up for voting.
   * 
   * # <weight>
   * ## Weight
   * - `O(B + M + P1)` or `O(B + M + P2)` where:
   *   - `B` is `proposal` size in bytes (length-fee-bounded)
   *   - `M` is members-count (code- and governance-bounded)
   *   - branching is influenced by `threshold` where:
   *     - `P1` is proposal execution complexity (`threshold < 2`)
   *     - `P2` is proposals-count (code-bounded) (`threshold >= 2`)
   * - DB:
   *   - 1 storage read `is_member` (codec `O(M)`)
   *   - 1 storage read `ProposalOf::contains_key` (codec `O(1)`)
   *   - DB accesses influenced by `threshold`:
   *     - EITHER storage accesses done by `proposal` (`threshold < 2`)
   *     - OR proposal insertion (`threshold <= 2`)
   *       - 1 storage mutation `Proposals` (codec `O(P2)`)
   *       - 1 storage mutation `ProposalCount` (codec `O(1)`)
   *       - 1 storage write `ProposalOf` (codec `O(B)`)
   *       - 1 storage write `Voting` (codec `O(M)`)
   *   - 1 event
   * # </weight>
   */
  get asV1160(): {threshold: number, proposal: v1160.Call, lengthBound: number} {
    assert(this.isV1160)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1160
  }

  get asLatest(): {threshold: number, proposal: v1160.Call, lengthBound: number} {
    deprecateLatest()
    return this.asV1160
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

export class DemocracyCancelProposalCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.cancelProposal' || this.ctx.extrinsic.name === 'democracy.cancel_proposal')
  }

  /**
   *  Remove a proposal.
   * 
   *  The dispatch origin of this call must be `CancelProposalOrigin`.
   * 
   *  - `prop_index`: The index of the proposal to cancel.
   * 
   *  Weight: `O(p)` where `p = PublicProps::<T>::decode_len()`
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('democracy.cancel_proposal') === '0e50c7564a4a7f4e6a09a0abcc8022f4445c064144d2318ed086e6080bee800d'
  }

  /**
   *  Remove a proposal.
   * 
   *  The dispatch origin of this call must be `CancelProposalOrigin`.
   * 
   *  - `prop_index`: The index of the proposal to cancel.
   * 
   *  Weight: `O(p)` where `p = PublicProps::<T>::decode_len()`
   */
  get asV1(): {propIndex: number} {
    assert(this.isV1)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1
  }

  get asLatest(): {propIndex: number} {
    deprecateLatest()
    return this.asV1
  }
}

export class DemocracyClearPublicProposalsCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.clearPublicProposals' || this.ctx.extrinsic.name === 'democracy.clear_public_proposals')
  }

  /**
   *  Clears all public proposals.
   * 
   *  The dispatch origin of this call must be _Root_.
   * 
   *  Weight: `O(1)`.
   */
  get isV1(): boolean {
    return this.ctx._chain.getCallHash('democracy.clear_public_proposals') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Clears all public proposals.
   * 
   *  The dispatch origin of this call must be _Root_.
   * 
   *  Weight: `O(1)`.
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
