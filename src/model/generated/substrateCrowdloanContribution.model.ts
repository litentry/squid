import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateAccount} from "./substrateAccount.model"
import {SubstrateRootAccount} from "./substrateRootAccount.model"

@Entity_()
export class SubstrateCrowdloanContribution {
  constructor(props?: Partial<SubstrateCrowdloanContribution>) {
    Object.assign(this, props)
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Index_()
  @ManyToOne_(() => SubstrateAccount, {nullable: false})
  account!: SubstrateAccount

  @Index_()
  @ManyToOne_(() => SubstrateRootAccount, {nullable: false})
  rootAccount!: SubstrateRootAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("integer", {nullable: false})
  paraId!: number

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("integer", {nullable: false})
  decimals!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint
}
