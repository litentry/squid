import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateCouncilVote} from "./substrateCouncilVote.model"
import {SubstrateProposalVote} from "./substrateProposalVote.model"
import {SubstrateProposalSecond} from "./substrateProposalSecond.model"
import {SubstrateElectionVote} from "./substrateElectionVote.model"

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

  @Column_("integer", {nullable: false})
  totalProposalSeconds!: number

  /**
   * includes both normal proposal votes and votes as a council member from council.vote()
   */
  @Column_("integer", {nullable: false})
  totalProposalVotes!: number

  @Column_("integer", {nullable: false})
  totalElectionVotes!: number

  @OneToMany_(() => SubstrateCouncilVote, e => e.account)
  councilVotes!: SubstrateCouncilVote[]

  @OneToMany_(() => SubstrateProposalVote, e => e.account)
  proposalVotes!: SubstrateProposalVote[]

  @OneToMany_(() => SubstrateProposalSecond, e => e.account)
  proposalSeconds!: SubstrateProposalSecond[]

  @OneToMany_(() => SubstrateElectionVote, e => e.account)
  electionVotes!: SubstrateElectionVote[]
}
