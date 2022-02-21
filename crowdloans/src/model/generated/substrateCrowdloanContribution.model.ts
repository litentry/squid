import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateCrowdloanContributionAccount} from "./substrateCrowdloanContributionAccount.model"
import {SubstrateParachain} from "./substrateParachain.model"
import {SubstrateCrowdloan} from "./substrateCrowdloan.model"

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

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Index_()
  @ManyToOne_(() => SubstrateCrowdloanContributionAccount, {nullable: false})
  account!: SubstrateCrowdloanContributionAccount

  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Index_()
  @ManyToOne_(() => SubstrateParachain, {nullable: false})
  parachain!: SubstrateParachain

  @Column_("integer", {nullable: false})
  paraId!: number

  @Index_()
  @ManyToOne_(() => SubstrateCrowdloan, {nullable: false})
  fund!: SubstrateCrowdloan

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("integer", {nullable: false})
  decimals!: number

  @Index_()
  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
