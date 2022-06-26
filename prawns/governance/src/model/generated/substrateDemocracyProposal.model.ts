import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateGovernanceAccount} from "./substrateGovernanceAccount.model"
import {SubstrateDemocracyProposalSecond} from "./substrateDemocracyProposalSecond.model"

@Entity_()
export class SubstrateDemocracyProposal {
  constructor(props?: Partial<SubstrateDemocracyProposal>) {
    Object.assign(this, props)
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Index_()
  @ManyToOne_(() => SubstrateGovernanceAccount, {nullable: false})
  account!: SubstrateGovernanceAccount

  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Index_()
  @Column_("int4", {nullable: false})
  proposalIndex!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("text", {nullable: false})
  status!: string

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  tabledAtBlock!: bigint | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  referendaId!: string | undefined | null

  @OneToMany_(() => SubstrateDemocracyProposalSecond, e => e.proposal)
  seconds!: SubstrateDemocracyProposalSecond[]
}
