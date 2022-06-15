import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateBalanceAccount} from "./substrateBalanceAccount.model"
import {SubstrateNetwork} from "./_substrateNetwork"

@Entity_()
export class SubstrateBalanceDeposit {
  constructor(props?: Partial<SubstrateBalanceDeposit>) {
    Object.assign(this, props)
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateBalanceAccount, {nullable: false})
  depositor!: SubstrateBalanceAccount

  @Index_()
  @ManyToOne_(() => SubstrateBalanceAccount, {nullable: false})
  depositee!: SubstrateBalanceAccount

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("integer", {nullable: false})
  decimals!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date
}
