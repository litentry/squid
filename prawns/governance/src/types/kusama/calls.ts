import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1020 from './v1020'
import * as v1022 from './v1022'
import * as v1024 from './v1024'
import * as v1027 from './v1027'
import * as v1029 from './v1029'
import * as v1030 from './v1030'
import * as v1031 from './v1031'
import * as v1032 from './v1032'
import * as v1038 from './v1038'
import * as v1039 from './v1039'
import * as v1040 from './v1040'
import * as v1042 from './v1042'
import * as v1050 from './v1050'
import * as v1054 from './v1054'
import * as v1055 from './v1055'
import * as v1058 from './v1058'
import * as v1062 from './v1062'
import * as v2005 from './v2005'
import * as v2007 from './v2007'
import * as v2011 from './v2011'
import * as v2013 from './v2013'
import * as v2015 from './v2015'
import * as v2022 from './v2022'
import * as v2023 from './v2023'
import * as v2024 from './v2024'
import * as v2025 from './v2025'
import * as v2026 from './v2026'
import * as v2028 from './v2028'
import * as v2029 from './v2029'
import * as v2030 from './v2030'
import * as v9010 from './v9010'
import * as v9030 from './v9030'
import * as v9040 from './v9040'
import * as v9050 from './v9050'
import * as v9080 from './v9080'
import * as v9090 from './v9090'
import * as v9100 from './v9100'
import * as v9111 from './v9111'
import * as v9122 from './v9122'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
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

export class CouncilProposeCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'council.propose')
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1020(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '18e2efe29a8d206f731ce298abc5c4589c6e957f037e6fdd559492ac07ac31bf'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1020(): {threshold: number, proposal: v1020.Type_88} {
    assert(this.isV1020)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1022(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '7b473e3585e41b8d2aa56690837c8da26ab4eb53d65af53d66b0d86ca9e55f56'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1022(): {threshold: number, proposal: v1022.Type_96} {
    assert(this.isV1022)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1024(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b98d81099da0b5575d0347b817618f368ae828e02e4c1029979c1f4cf1f7a349'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1024(): {threshold: number, proposal: v1024.Type_96} {
    assert(this.isV1024)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1027(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '76456aae5f9a37aaae1c87ac83859fecd30d88455b3ea16aeca886c227f7ff0c'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1027(): {threshold: number, proposal: v1027.Type_96} {
    assert(this.isV1027)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1029(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b956298d254fa26c5a5b3d92cc15a3883c429d8cd2e550071129e06c25e3700e'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1029(): {threshold: number, proposal: v1029.Type_96} {
    assert(this.isV1029)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1030(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '6ebbd9b7f4bbcf27d0982e41dad8ce79fa1d8be715b046457f7f4855ff65e5de'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1030(): {threshold: number, proposal: v1030.Type_96} {
    assert(this.isV1030)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1031(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'cff684254942607e7e626720e2bb46cb0e42314f2d672b7ee93dc0d11251e62e'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1031(): {threshold: number, proposal: v1031.Type_96} {
    assert(this.isV1031)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1032(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '1d3359d1f920eb35fa253f67435238e5708c360a278414f045bbb03069873bfd'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1032(): {threshold: number, proposal: v1032.Type_96} {
    assert(this.isV1032)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1038(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '1af57d45c115aa109e4d175d8d7f845fc238af893a03a9f34cac06caf60648be'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1038(): {threshold: number, proposal: v1038.Type_96} {
    assert(this.isV1038)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1039(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'b90f14d3344a6dde839566dc40423b86d8a4daa35e54205f6e83e7321f75c66f'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1039(): {threshold: number, proposal: v1039.Type_96} {
    assert(this.isV1039)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1040(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '72ab33fcdb588f610fdc9fcfc6349b1d0ba910ca9c9adea194118354e742a73b'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1040(): {threshold: number, proposal: v1040.Type_96} {
    assert(this.isV1040)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1042(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '312a838a4c646084ed92df99dbb860a317f33e6b77e9854badd41c621ff0261a'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1042(): {threshold: number, proposal: v1042.Type_96} {
    assert(this.isV1042)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1050(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '1aa4dc67323620954778bc81dcbb3704b054826fac1a811cd23574d4edbb337a'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1050(): {threshold: number, proposal: v1050.Type_99} {
    assert(this.isV1050)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1054(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'a5d33d99ed057e639b606de5ec5d8a5b6400150c9b415dfdaf759f6e7f352b43'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1054(): {threshold: number, proposal: v1054.Type_99} {
    assert(this.isV1054)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1055(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'bdff8cca4b4170b7ae865f6c9d10d3c358f2811bcb89cd960a0a37d8fe7e5096'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1055(): {threshold: number, proposal: v1055.Type_102} {
    assert(this.isV1055)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1058(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '867448d78e133d66551fcee45e5c1af25d9fa9e1c185965c45e3739998aae323'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1058(): {threshold: number, proposal: v1058.Type_162} {
    assert(this.isV1058)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get isV1062(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'bfc31caca4fc036425d52f528d68ed1056e3ff85a12ec09e4c9edcabe943c92e'
  }

  /**
   *  # <weight>
   *  - Bounded storage reads and writes.
   *  - Argument `threshold` has bearing on weight.
   *  # </weight>
   */
  get asV1062(): {threshold: number, proposal: v1062.Type_161} {
    assert(this.isV1062)
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
  get isV2005(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'd59eb0d69c56051e38eee6faf8d12ba12f42be899cb2e7da27f4230abff68339'
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
  get asV2005(): {threshold: number, proposal: v2005.Type_174, lengthBound: number} {
    assert(this.isV2005)
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
  get isV2007(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '2a27424d75a4a72273fc975b4859f8a95ccb44ac19d6bf7b6145698fc1fc638b'
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
  get asV2007(): {threshold: number, proposal: v2007.Type_175, lengthBound: number} {
    assert(this.isV2007)
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
  get isV2011(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'de62121e59119e31854351b75d35e87ef34de2ed5914043fe5a2b94fb6395966'
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
  get asV2011(): {threshold: number, proposal: v2011.Type_176, lengthBound: number} {
    assert(this.isV2011)
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
  get isV2013(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'be5c9c752d81a61f39a4a7c872688052cf7ba3c399013e2aa4eecee023077183'
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
  get asV2013(): {threshold: number, proposal: v2013.Type_176, lengthBound: number} {
    assert(this.isV2013)
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
  get isV2015(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '7f576531709a8723a57f68a4eaa6627231ae8094b4c0632f64eeb86e1bafa822'
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
  get asV2015(): {threshold: number, proposal: v2015.Type_178, lengthBound: number} {
    assert(this.isV2015)
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
  get isV2022(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '12990f343b973c9d6e1faf797bc53268b9c3993d3ce8408c5384f7627c454a8c'
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
  get asV2022(): {threshold: number, proposal: v2022.Type_178, lengthBound: number} {
    assert(this.isV2022)
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
  get isV2023(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '1e4b5dd721c6df359a2150c4806aab93f91b4a8b7b3241d00c9308efa4a32798'
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
  get asV2023(): {threshold: number, proposal: v2023.Type_180, lengthBound: number} {
    assert(this.isV2023)
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
  get isV2024(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'f3f0b24294c390d15aa833a05b530f76c5fb3279009876a5cf0836883da55906'
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
  get asV2024(): {threshold: number, proposal: v2024.Type_180, lengthBound: number} {
    assert(this.isV2024)
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
  get isV2025(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'cd0ee42284327dd8b2282ec5c44c5909d674d11934accda0dbdef3a7628a590e'
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
  get asV2025(): {threshold: number, proposal: v2025.Type_181, lengthBound: number} {
    assert(this.isV2025)
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
  get isV2026(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'e4801778359e0f25da034bc47745d4d4c939dedb24725bc00632dc4ad88dd5dd'
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
  get asV2026(): {threshold: number, proposal: v2026.Type_180, lengthBound: number} {
    assert(this.isV2026)
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
  get isV2028(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'fcbda889fbf5691206c2a05cef908e7e59d76fe9fd8728603213bab703dfcff6'
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
  get asV2028(): {threshold: number, proposal: v2028.Type_185, lengthBound: number} {
    assert(this.isV2028)
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
  get isV2029(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '27b9d68db1bbf61921912de8c5a9db01093cf62a46283eb32c70babb4aed30ca'
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
  get asV2029(): {threshold: number, proposal: v2029.Type_185, lengthBound: number} {
    assert(this.isV2029)
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
  get isV2030(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '1868fa8bd2eba54d38189e851743a49d09c3e38466c72261e400f95f21385fca'
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
  get asV2030(): {threshold: number, proposal: v2030.Type_124, lengthBound: number} {
    assert(this.isV2030)
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
  get isV9010(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '5f408302e8d295ede4a9d5facd270248636e9d2d2ee68b565ba28668f43f1670'
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
  get asV9010(): {threshold: number, proposal: v9010.Type_124, lengthBound: number} {
    assert(this.isV9010)
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
  get isV9030(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '6119b75fae0215e6d6d4ed253f45596cc12cf92f4783d2c70b2bf60d8942a29f'
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
  get asV9030(): {threshold: number, proposal: v9030.Type_124, lengthBound: number} {
    assert(this.isV9030)
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
  get isV9040(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === 'c151ad63c35cbcc35c6a917dc0915b726c1317d99127d2d33d1131d60105468c'
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
  get asV9040(): {threshold: number, proposal: v9040.Type_124, lengthBound: number} {
    assert(this.isV9040)
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
    return this.ctx._chain.getCallHash('council.propose') === '6b44d8db2999af94a1bcaee9354d57c6cb3b022a622d1b681496432768796671'
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
  get asV9050(): {threshold: number, proposal: v9050.Type_125, lengthBound: number} {
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
    return this.ctx._chain.getCallHash('council.propose') === '07b488fb7031d4c0d2d5b7c5810d442ba97163e5930b1e316b39c0f2092cf60f'
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
  get asV9080(): {threshold: number, proposal: v9080.Type_124, lengthBound: number} {
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
    return this.ctx._chain.getCallHash('council.propose') === 'eb6fb6d0f3d6eb8dd925260f06bf06c55acf125b565224ff4b8f5ce902a7c19c'
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
  get asV9090(): {threshold: number, proposal: v9090.Type_124, lengthBound: number} {
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
    return this.ctx._chain.getCallHash('council.propose') === '29ba2a27710b29d01fb5b1d6cb28f6df1682c2c6d38efd6a75d36ed30a6f40a3'
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
  get asV9100(): {threshold: number, proposal: v9100.Type_124, lengthBound: number} {
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
  get isV9111(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '0c0257cda4b8453fb7606e6618e78afa7f767980399eda27db7479577baed06c'
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
  get asV9111(): {threshold: number, proposal: v9111.Call, lengthBound: number} {
    assert(this.isV9111)
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
  get isV9122(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '7acb9a65dea691f181c3406898de9c0b1376a3c3808b7a3463661b80c806db03'
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
  get asV9122(): {threshold: number, proposal: v9122.Call, lengthBound: number} {
    assert(this.isV9122)
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
  get isV9130(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '31483aedc08b20c7d52d102cfa9ed44357b54a7780cc144e999538deb8dfa695'
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
  get asV9130(): {threshold: number, proposal: v9130.Call, lengthBound: number} {
    assert(this.isV9130)
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
  get isV9160(): boolean {
    return this.ctx._chain.getCallHash('council.propose') === '55f10e01e879aef7400343dcd2d1d58817faa652609758f0026bd2b283f061e6'
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
  get asV9160(): {threshold: number, proposal: v9160.Call, lengthBound: number} {
    assert(this.isV9160)
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
    return this.ctx._chain.getCallHash('council.propose') === '024996b362c5015595fc0392bdd13cb83541690edfffff559e910b10d23d6b4c'
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
    return this.ctx._chain.getCallHash('council.propose') === 'c1715380eb35282df716232512a68fe082fdfc387f72ac0324ced2f48ff1acc0'
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
    return this.ctx._chain.getCallHash('council.propose') === '734a8bfd0da4271b3f3a2c85ab54d5582d2cfafb0ecf773d389183c314260a7f'
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
    return this.ctx._chain.getCallHash('council.propose') === '6e3b4ed41b9adfbeda769e211282e0cac0a46fc84abb0252264e60a0c73c1361'
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
    return this.ctx._chain.getCallHash('council.propose') === '5b05679fb5ddf91f455a5ad5bd60e6d8203439bd51d751b57cfef9ad528f1bdc'
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
  get isV2025(): boolean {
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
  get asV2025(): {propIndex: number} {
    assert(this.isV2025)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV2025
  }

  get asLatest(): {propIndex: number} {
    deprecateLatest()
    return this.asV2025
  }
}

export class DemocracyClearPublicProposalsCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'democracy.clearPublicProposals' || this.ctx.extrinsic.name === 'democracy.clear_public_proposals')
  }

  /**
   *  Veto and blacklist the proposal hash. Must be from Root origin.
   */
  get isV1022(): boolean {
    return this.ctx._chain.getCallHash('democracy.clear_public_proposals') === '01f2f9c28aa1d4d36a81ff042620b6677d25bf07c2bf4acc37b58658778a4fca'
  }

  /**
   *  Veto and blacklist the proposal hash. Must be from Root origin.
   */
  get asV1022(): null {
    assert(this.isV1022)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1022
  }

  get asLatest(): null {
    deprecateLatest()
    return this.asV1022
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
    return this.ctx._chain.getCallHash('treasury.propose_spend') === '716689a9bf600e2a2fed633501a80e9ae7082f3d19352663230c0a56fa8652c3'
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
  get asV1020(): {value: bigint, beneficiary: v1020.Type_17} {
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
