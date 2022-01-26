import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateAccount} from "./substrateAccount.model"
import {SubstrateRootAccount} from "./substrateRootAccount.model"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateTransfer} from "./substrateTransfer.model"

@Entity_()
export class SubstrateBalance {
  constructor(props?: Partial<SubstrateBalance>) {
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
  @ManyToOne_(() => SubstrateAccount, {nullable: false})
  account!: SubstrateAccount

  /**
   * hex address
   */
  @Index_()
  @ManyToOne_(() => SubstrateRootAccount, {nullable: false})
  rootAccount!: SubstrateRootAccount

  @Index_()
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

  @Column_("integer", {nullable: true})
  totalTransfers!: number | undefined | null

  @OneToMany_(() => SubstrateTransfer, e => e.to)
  transfersTo!: SubstrateTransfer[]

  @OneToMany_(() => SubstrateTransfer, e => e.from)
  transfersFrom!: SubstrateTransfer[]
}
