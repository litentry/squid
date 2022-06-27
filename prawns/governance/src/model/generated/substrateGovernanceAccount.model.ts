import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateCouncilVote} from "./substrateCouncilVote.model"
import {SubstrateProposalVote} from "./substrateProposalVote.model"
import {SubstrateDemocracyProposalSecond} from "./substrateDemocracyProposalSecond.model"
import {SubstrateDemocracyProposal} from "./substrateDemocracyProposal.model"
import {SubstrateCouncilProposal} from "./substrateCouncilProposal.model"
import {SubstrateTechnicalCommitteeProposal} from "./substrateTechnicalCommitteeProposal.model"
import {SubstrateElectionVote} from "./substrateElectionVote.model"
import {SubstrateBountyProposal} from "./substrateBountyProposal.model"
import {SubstrateTreasuryProposal} from "./substrateTreasuryProposal.model"

@Entity_()
export class SubstrateGovernanceAccount {
  constructor(props?: Partial<SubstrateGovernanceAccount>) {
    Object.assign(this, props)
  }

  /**
   * address
   */
  @PrimaryColumn_()
  id!: string

  /**
   * hex address
   */
  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("int4", {nullable: false})
  totalDemocracyProposalSeconds!: number

  /**
   * includes both normal proposal votes and votes as a council member from council.vote()
   */
  @Column_("int4", {nullable: false})
  totalProposalVotes!: number

  @Column_("int4", {nullable: false})
  totalElectionVotes!: number

  /**
   * Deprecated in favour of totalDemocracyProposals
   */
  @Column_("int4", {nullable: false})
  totalProposals!: number

  @Column_("int4", {nullable: false})
  totalDemocracyProposals!: number

  @Column_("int4", {nullable: false})
  totalCouncilProposals!: number

  @Column_("int4", {nullable: false})
  totalTechnicalCommitteeProposals!: number

  @Column_("int4", {nullable: false})
  totalBountyProposals!: number

  @Column_("int4", {nullable: false})
  totalTreasurySpendProposals!: number

  @OneToMany_(() => SubstrateCouncilVote, e => e.account)
  councilVotes!: SubstrateCouncilVote[]

  @OneToMany_(() => SubstrateProposalVote, e => e.account)
  proposalVotes!: SubstrateProposalVote[]

  @OneToMany_(() => SubstrateDemocracyProposalSecond, e => e.account)
  democracyProposalSeconds!: SubstrateDemocracyProposalSecond[]

  @OneToMany_(() => SubstrateDemocracyProposal, e => e.account)
  democracyProposals!: SubstrateDemocracyProposal[]

  @OneToMany_(() => SubstrateCouncilProposal, e => e.account)
  councilProposals!: SubstrateCouncilProposal[]

  @OneToMany_(() => SubstrateTechnicalCommitteeProposal, e => e.account)
  technicalCommitteeProposals!: SubstrateTechnicalCommitteeProposal[]

  @OneToMany_(() => SubstrateElectionVote, e => e.account)
  electionVotes!: SubstrateElectionVote[]

  @OneToMany_(() => SubstrateBountyProposal, e => e.account)
  bountyProposals!: SubstrateBountyProposal[]

  @OneToMany_(() => SubstrateTreasuryProposal, e => e.account)
  treasurySpendProposals!: SubstrateTreasuryProposal[]
}
