import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v0 from './v0'
import * as v10 from './v10'
import * as v11 from './v11'
import * as v13 from './v13'
import * as v14 from './v14'
import * as v15 from './v15'
import * as v17 from './v17'
import * as v18 from './v18'
import * as v23 from './v23'
import * as v24 from './v24'
import * as v25 from './v25'
import * as v26 from './v26'
import * as v28 from './v28'
import * as v29 from './v29'
import * as v30 from './v30'
import * as v5 from './v5'
import * as v6 from './v6'
import * as v7 from './v7'
import * as v9 from './v9'
import * as v9050 from './v9050'
import * as v9080 from './v9080'
import * as v9090 from './v9090'
import * as v9100 from './v9100'
import * as v9110 from './v9110'
import * as v9140 from './v9140'
import * as v9170 from './v9170'
import * as v9180 from './v9180'
import * as v9190 from './v9190'
import * as v9220 from './v9220'
import * as v9230 from './v9230'

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
  get isV28(): boolean {
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
  get asV28(): {value: bigint, description: Uint8Array} {
    assert(this.isV28)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV28
  }

  get asLatest(): {value: bigint, description: Uint8Array} {
    deprecateLatest()
    return this.asV28
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
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e25b6f31463d46d4aebb2e3b78be84295b8d7a068c8af6adcf096eede9d28e61'
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
  get asV0(): {threshold: number, proposal: v0.Type_182, lengthBound: number} {
    assert(this.isV0)
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
    return this.ctx._chain.getCallHash('council.propose') === '656ce966f9f030999d73f136742a26098e680f919521d6d6a70633213d52d15c'
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
  get asV5(): {threshold: number, proposal: v5.Type_180, lengthBound: number} {
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
  get isV6(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b1b715038444640fea5601909f1383dd74e1b3170764c7ae3c3e49bf6b7ce567'
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
  get asV6(): {threshold: number, proposal: v6.Type_180, lengthBound: number} {
    assert(this.isV6)
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
  get isV7(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'beff05b28fc884234790c6b2182b243b0dc3a3ea15db88c44781be53c9946511'
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
  get asV7(): {threshold: number, proposal: v7.Type_181, lengthBound: number} {
    assert(this.isV7)
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
  get isV9(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e7700131fc318e7f338361469052eb5a5a90467b4a97a432deaec2fcb77670ca'
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
  get asV9(): {threshold: number, proposal: v9.Type_181, lengthBound: number} {
    assert(this.isV9)
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
    return this.ctx._chain.getCallHash('council.propose') === 'a7f76fcae420adcecb02ec995cca335f5602f451b85d9293094a3b64b62985ad'
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
  get asV10(): {threshold: number, proposal: v10.Type_181, lengthBound: number} {
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
  get isV11(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '3989fe76ed75268211ac44818830f126f46b9c2af0896033f2f8d73ca26f58a8'
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
  get asV11(): {threshold: number, proposal: v11.Type_182, lengthBound: number} {
    assert(this.isV11)
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
  get isV13(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b1373e330c82df49a5b4d7903c7bff1f098e139596ab7dcd81fa4aba32dc0826'
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
  get asV13(): {threshold: number, proposal: v13.Type_182, lengthBound: number} {
    assert(this.isV13)
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
    return this.ctx._chain.getCallHash('council.propose') === 'c5405d55f056069420ae44fdbf3e050cf3b394ddf3ef7fb24279a803899de530'
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
  get asV14(): {threshold: number, proposal: v14.Type_184, lengthBound: number} {
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
  get isV15(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '02450a0a9bf8284c7a38fbfdcbd6be67dcf65cede744b1e9db2c3820c0b457d1'
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
  get asV15(): {threshold: number, proposal: v15.Type_184, lengthBound: number} {
    assert(this.isV15)
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
  get isV17(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'ae3ccec69efe2715814e268ac097d1a0c8a80b803aa35d99fdd6ad0a48bdeb60'
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
  get asV17(): {threshold: number, proposal: v17.Type_184, lengthBound: number} {
    assert(this.isV17)
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
  get isV18(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'de6f6a429cbb0bf5c7a2498cac05330823b46f4d3d2634047064e6fd28cd7c23'
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
  get asV18(): {threshold: number, proposal: v18.Type_184, lengthBound: number} {
    assert(this.isV18)
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
  get isV23(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'f52297e9635e6273e9364b4f2f1ac033d179e1312f7260d28a65f0b3f2919444'
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
  get asV23(): {threshold: number, proposal: v23.Type_186, lengthBound: number} {
    assert(this.isV23)
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
  get isV24(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e9d45bcec2bf7231a2762d5e9ebf6f00e99e1bf8d03d5dc12d14130fa75f8df8'
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
  get asV24(): {threshold: number, proposal: v24.Type_186, lengthBound: number} {
    assert(this.isV24)
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
  get isV25(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e9e34f601a9ac9d3abcf362257ba2a18797e7f9624da6fdfb1c2c6873fe14573'
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
  get asV25(): {threshold: number, proposal: v25.Type_187, lengthBound: number} {
    assert(this.isV25)
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
  get isV26(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '06cf56f82da4c29c483e1d5da6e20d229fd5dbcf2675184885b4635701fa65fb'
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
  get asV26(): {threshold: number, proposal: v26.Type_186, lengthBound: number} {
    assert(this.isV26)
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
  get isV28(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '849c458fb457a2d803e5bf17629749fd3ccfd49a0a074f58bd2385a839ceb3d9'
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
  get asV28(): {threshold: number, proposal: v28.Type_191, lengthBound: number} {
    assert(this.isV28)
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
  get isV29(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b66885130b189c3fbcce49589cdba1a346a0e0f97ca58ad462811077a9bf7606'
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
  get asV29(): {threshold: number, proposal: v29.Type_191, lengthBound: number} {
    assert(this.isV29)
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
  get isV30(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'a0ea47e56b3c580184c6fc315d091223099614c8063cef9038c3e3f6f95836e3'
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
  get asV30(): {threshold: number, proposal: v30.Type_130, lengthBound: number} {
    assert(this.isV30)
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
  get isV9050(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '267025644f7c51aad3617fc6321239cb632caf1dee5029bc9aa2fb12e0386990'
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
  get asV9050(): {threshold: number, proposal: v9050.Type_131, lengthBound: number} {
    assert(this.isV9050)
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
  get isV9080(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'd9c4019fd161246a16cd7e0199d70fc8786297dbcd6680b8c6ae5589ebc14a38'
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
  get asV9080(): {threshold: number, proposal: v9080.Type_130, lengthBound: number} {
    assert(this.isV9080)
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
  get isV9090(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '38f1e99556aa0ad954b10c6bfd6a312df64a405c9fe3fa616bd0b591006c9aa0'
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
  get asV9090(): {threshold: number, proposal: v9090.Type_130, lengthBound: number} {
    assert(this.isV9090)
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
  get isV9100(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '5f1850f1e7fe97cb54762cf6d6575ad72195a2101b66274f5fc4c3470187894e'
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
  get asV9100(): {threshold: number, proposal: v9100.Type_130, lengthBound: number} {
    assert(this.isV9100)
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
  get isV9110(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'd1946f7e65c3ddc265a5db6c27b25345e299a92ec2c291dbcfa25f01517564f7'
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
  get asV9110(): {threshold: number, proposal: v9110.Call, lengthBound: number} {
    assert(this.isV9110)
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
  get isV9140(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '5acf105b77893e2768883c1427b2f04f86e6260a1f825430262044de6a733763'
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
  get asV9140(): {threshold: number, proposal: v9140.Call, lengthBound: number} {
    assert(this.isV9140)
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
  get isV9170(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '44d79b5139d8fd7626832049cbda443b956fa1cbaa171750afe2f835fc27f4ae'
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
  get asV9170(): {threshold: number, proposal: v9170.Call, lengthBound: number} {
    assert(this.isV9170)
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
  get isV9180(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '96ebed90cca1c91099addf9337f80190755579a2ec6bb9c6d9cfb92050e4aa32'
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
  get asV9180(): {threshold: number, proposal: v9180.Call, lengthBound: number} {
    assert(this.isV9180)
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
  get isV9190(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '9f3a15a5d44d785663c7b310fe66186033ab65915b1bd6121e04d824ff903ab7'
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
  get asV9190(): {threshold: number, proposal: v9190.Call, lengthBound: number} {
    assert(this.isV9190)
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
  get isV9220(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '15b7d99cbeb7476f3dc25b3034986fbadfc6ea062bffd7d5611b34a14dda51c7'
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
  get asV9220(): {threshold: number, proposal: v9220.Call, lengthBound: number} {
    assert(this.isV9220)
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
  get isV9230(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'c23b591f81c15625d0eb616befd049e7a6ea891ea0b73c40e1f52ab47e0ab8f8'
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
  get asV9230(): {threshold: number, proposal: v9230.Call, lengthBound: number} {
    assert(this.isV9230)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9230
  }

  get asLatest(): {threshold: number, proposal: v9230.Call, lengthBound: number} {
    deprecateLatest()
    return this.asV9230
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
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('council.vote') === 'f8a1069a57f7b721f47c086d08b6838ae1a0c08f58caddb82428ba5f1407540f'
  }

  /**
   *  Add an aye or nay vote for the sender to the given proposal.
   * 
   *  Requires the sender to be a member.
   * 
   *  # <weight>
   *  ## Weight
   *  - `O(M)` where `M` is members-count (code- and governance-bounded)
   *  - DB:
   *    - 1 storage read `Members` (codec `O(M)`)
   *    - 1 storage mutation `Voting` (codec `O(M)`)
   *  - 1 event
   *  # </weight>
   */
  get asV0(): {proposal: Uint8Array, index: number, approve: boolean} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {proposal: Uint8Array, index: number, approve: boolean} {
    deprecateLatest()
    return this.asV0
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
  get isV25(): boolean {
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
  get asV25(): {propIndex: number} {
    assert(this.isV25)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV25
  }

  get asLatest(): {propIndex: number} {
    deprecateLatest()
    return this.asV25
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
   *  # <weight>
   *  - `O(1)`.
   *  - Db writes: `PublicProps`
   *  - Base Weight: 2.505 µs
   *  # </weight>
   */
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('democracy.clear_public_proposals') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Clears all public proposals.
   * 
   *  The dispatch origin of this call must be _Root_.
   * 
   *  # <weight>
   *  - `O(1)`.
   *  - Db writes: `PublicProps`
   *  - Base Weight: 2.505 µs
   *  # </weight>
   */
  get asV0(): null {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): null {
    deprecateLatest()
    return this.asV0
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
   *  # <weight>
   *  - Complexity: `O(S)` where S is the number of seconds a proposal already has.
   *  - Db reads: `DepositOf`
   *  - Db writes: `DepositOf`
   *  ---------
   *  - Base Weight: 22.28 + .229 * S µs
   *  # </weight>
   */
  get isV0(): boolean {
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
  get asV0(): {proposal: number, secondsUpperBound: number} {
    assert(this.isV0)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): {proposal: number, secondsUpperBound: number} {
    deprecateLatest()
    return this.asV0
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
   *  # <weight>
   *  - Complexity: `O(R)` where R is the number of referendums the voter has voted on.
   *    weight is charged as if maximum votes.
   *  - Db reads: `ReferendumInfoOf`, `VotingOf`, `balances locks`
   *  - Db writes: `ReferendumInfoOf`, `VotingOf`, `balances locks`
   *  --------------------
   *  - Base Weight:
   *      - Vote New: 49.24 + .333 * R µs
   *      - Vote Existing: 49.94 + .343 * R µs
   *  # </weight>
   */
  get isV0(): boolean {
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
   *  - Complexity: `O(R)` where R is the number of referendums the voter has voted on.
   *    weight is charged as if maximum votes.
   *  - Db reads: `ReferendumInfoOf`, `VotingOf`, `balances locks`
   *  - Db writes: `ReferendumInfoOf`, `VotingOf`, `balances locks`
   *  --------------------
   *  - Base Weight:
   *      - Vote New: 49.24 + .333 * R µs
   *      - Vote Existing: 49.94 + .343 * R µs
   *  # </weight>
   */
  get asV0(): {refIndex: number, vote: v0.AccountVote} {
    assert(this.isV0)
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
  get isV9110(): boolean {
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
  get asV9110(): {refIndex: number, vote: v9110.AccountVote} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {refIndex: number, vote: v9110.AccountVote} {
    deprecateLatest()
    return this.asV9110
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
  get isV9050(): boolean {
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
  get asV9050(): {votes: Uint8Array[], value: bigint} {
    assert(this.isV9050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9050
  }

  get asLatest(): {votes: Uint8Array[], value: bigint} {
    deprecateLatest()
    return this.asV9050
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
  get isV0(): boolean {
    return this.ctx._chain.getCallHash('treasury.propose_spend') === '98e9af32f46010396e58ac70ce7c017f7e95d81b05c03d5e5aeb94ce27732909'
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
  get asV0(): {value: bigint, beneficiary: Uint8Array} {
    assert(this.isV0)
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
  get isV28(): boolean {
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
  get asV28(): {value: bigint, beneficiary: v28.GenericMultiAddress} {
    assert(this.isV28)
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
  get isV9110(): boolean {
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
  get asV9110(): {value: bigint, beneficiary: v9110.MultiAddress} {
    assert(this.isV9110)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9110
  }

  get asLatest(): {value: bigint, beneficiary: v9110.MultiAddress} {
    deprecateLatest()
    return this.asV9110
  }
}
