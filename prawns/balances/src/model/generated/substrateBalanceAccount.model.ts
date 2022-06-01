import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateBalanceTransfer} from "./substrateBalanceTransfer.model"
import {SubstrateTreasuryDeposit} from "./substrateTreasuryDeposit.model"

@Entity_()
export class SubstrateBalanceAccount {
  constructor(props?: Partial<SubstrateBalanceAccount>) {
    Object.assign(this, props)
  }

  /**
   * address:tokenSymbol
   */
  @PrimaryColumn_()
  id!: string

  /**
   * address
   */
  @Index_()
  @Column_("text", {nullable: false})
  account!: string

  /**
   * hex address
   */
  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("text", {nullable: false})
  symbol!: string

  @Column_("integer", {nullable: false})
  decimals!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("timestamp with time zone", {nullable: true})
  firstTransferInDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferInBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  firstTransferOutDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferOutBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  lastTransferInDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferInBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  lastTransferOutDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferOutBlockNumber!: bigint | undefined | null

  @Column_("integer", {nullable: false})
  totalTransfers!: number

  @OneToMany_(() => SubstrateBalanceTransfer, e => e.to)
  transfersTo!: SubstrateBalanceTransfer[]

  @OneToMany_(() => SubstrateBalanceTransfer, e => e.from)
  transfersFrom!: SubstrateBalanceTransfer[]

  @OneToMany_(() => SubstrateTreasuryDeposit, e => e.depositor)
  treasuryDeposits!: SubstrateTreasuryDeposit[]
}
