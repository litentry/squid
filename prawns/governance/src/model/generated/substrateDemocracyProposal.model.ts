import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateGovernanceAccount} from "./substrateGovernanceAccount.model"
import {SubstrateDemocracyProposalStatus} from "./_substrateDemocracyProposalStatus"
import {SubstrateDemocracyPreimage} from "./substrateDemocracyPreimage.model"
import {SubstrateDemocracyReferenda} from "./substrateDemocracyReferenda.model"
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
  @Column_("text", {nullable: false})
  proposalHash!: string

  @Index_()
  @Column_("int4", {nullable: false})
  proposalIndex!: number

  @Column_("text", {nullable: true})
  title!: string | undefined | null

  @Column_("text", {nullable: true})
  description!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  depositAmount!: bigint

  @Column_("varchar", {length: 9, nullable: false})
  status!: SubstrateDemocracyProposalStatus

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  tabledAtBlock!: bigint | undefined | null

  @Index_()
  @ManyToOne_(() => SubstrateDemocracyPreimage, {nullable: true})
  preimage!: SubstrateDemocracyPreimage | undefined | null

  @Index_()
  @ManyToOne_(() => SubstrateDemocracyReferenda, {nullable: true})
  democracyReferenda!: SubstrateDemocracyReferenda | undefined | null

  @OneToMany_(() => SubstrateDemocracyProposalSecond, e => e.proposal)
  seconds!: SubstrateDemocracyProposalSecond[]
}
