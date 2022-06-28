import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateGovernanceAccount} from "./substrateGovernanceAccount.model"
import {SubstrateDemocracyProposal} from "./substrateDemocracyProposal.model"

@Entity_()
export class SubstrateDemocracyProposalSecond {
  constructor(props?: Partial<SubstrateDemocracyProposalSecond>) {
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
  @ManyToOne_(() => SubstrateDemocracyProposal, {nullable: false})
  proposal!: SubstrateDemocracyProposal

  @Column_("int4", {nullable: true})
  upperBound!: number | undefined | null
}
