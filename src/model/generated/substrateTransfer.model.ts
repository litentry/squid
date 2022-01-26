import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateBalance} from "./substrateBalance.model"

@Entity_()
export class SubstrateTransfer {
  constructor(props?: Partial<SubstrateTransfer>) {
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

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("integer", {nullable: false})
  decimals!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  toAccountBalanceAtBlock!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  fromAccountBalanceAtBlock!: bigint

  @Index_()
  @ManyToOne_(() => SubstrateBalance, {nullable: false})
  to!: SubstrateBalance

  @Index_()
  @ManyToOne_(() => SubstrateBalance, {nullable: false})
  from!: SubstrateBalance

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  tip!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date
}
