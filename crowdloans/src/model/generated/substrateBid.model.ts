import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateAuction} from "./substrateAuction.model"
import {SubstrateParachain} from "./substrateParachain.model"
import {SubstrateCrowdloan} from "./substrateCrowdloan.model"

@Entity_()
export class SubstrateBid {
  constructor(props?: Partial<SubstrateBid>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateAuction, {nullable: false})
  auction!: SubstrateAuction

  @Index_()
  @Column_("integer", {nullable: true})
  winningAuction!: number | undefined | null

  @Index_()
  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Index_()
  @ManyToOne_(() => SubstrateParachain, {nullable: false})
  parachain!: SubstrateParachain

  @Column_("bool", {nullable: false})
  isCrowdloan!: boolean

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("integer", {nullable: false})
  decimals!: number

  @Column_("text", {nullable: false})
  symbol!: string

  @Index_()
  @ManyToOne_(() => SubstrateCrowdloan, {nullable: true})
  fund!: SubstrateCrowdloan | undefined | null

  @Column_("integer", {nullable: false})
  firstSlot!: number

  @Column_("integer", {nullable: false})
  lastSlot!: number

  @Column_("text", {nullable: true})
  bidder!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date
}
