import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateBalanceChangeEvent} from "./substrateBalanceChangeEvent.model"
import {SubstrateBalanceTransfer} from "./substrateBalanceTransfer.model"

@Entity_()
export class SubstrateBalanceAccount {
  constructor(props?: Partial<SubstrateBalanceAccount>) {
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
  publicKey!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("int4", {nullable: false})
  decimals!: number

  @Column_("timestamp with time zone", {nullable: true})
  firstBalanceChangeEventDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstBalanceChangeEventBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  lastBalanceChangeEventDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastBalanceChangeEventBlockNumber!: bigint | undefined | null

  @Column_("int4", {nullable: false})
  totalBalanceChangeEvents!: number

  @Column_("int4", {nullable: false})
  totalTransfers!: number

  @OneToMany_(() => SubstrateBalanceChangeEvent, e => e.account)
  balanceChangeEvents!: SubstrateBalanceChangeEvent[]

  @OneToMany_(() => SubstrateBalanceTransfer, e => e.to)
  transfersTo!: SubstrateBalanceTransfer[]

  @OneToMany_(() => SubstrateBalanceTransfer, e => e.from)
  transfersFrom!: SubstrateBalanceTransfer[]
}
