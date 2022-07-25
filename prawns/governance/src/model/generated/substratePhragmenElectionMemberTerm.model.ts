import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateGovernanceAccount} from "./substrateGovernanceAccount.model"

@Entity_()
export class SubstratePhragmenElectionMemberTerm {
  constructor(props?: Partial<SubstratePhragmenElectionMemberTerm>) {
    Object.assign(this, props)
  }

  /**
   * network:block:eventIndex:memberIndex
   */
  @PrimaryColumn_()
  id!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Index_()
  @Column_("bool", {nullable: false})
  isCurrentTerm!: boolean

  @Index_()
  @ManyToOne_(() => SubstrateGovernanceAccount, {nullable: false})
  account!: SubstrateGovernanceAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  backing!: bigint
}
