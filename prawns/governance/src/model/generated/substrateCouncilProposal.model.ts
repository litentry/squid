import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateGovernanceAccount} from "./substrateGovernanceAccount.model"
import {SubstrateCouncilVote} from "./substrateCouncilVote.model"

@Entity_()
export class SubstrateCouncilProposal {
  constructor(props?: Partial<SubstrateCouncilProposal>) {
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

  @Column_("timestamp with time zone", {nullable: false})
  lastUpdate!: Date

  @Index_()
  @Column_("int4", {nullable: true})
  proposalId!: number | undefined | null

  @Index_()
  @Column_("int4", {nullable: true})
  proposalIndex!: number | undefined | null

  @Index_()
  @Column_("text", {nullable: false})
  proposalHash!: string

  @Column_("text", {nullable: true})
  pallet!: string | undefined | null

  @Column_("text", {nullable: true})
  method!: string | undefined | null

  @Column_("text", {nullable: false})
  status!: string

  @Column_("int4", {nullable: false})
  ayeCount!: number

  @Column_("int4", {nullable: false})
  nayCount!: number

  @OneToMany_(() => SubstrateCouncilVote, e => e.proposal)
  votes!: SubstrateCouncilVote[]

  @Column_("int4", {nullable: false})
  threshold!: number
}
