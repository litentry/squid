import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateParachain} from "./substrateParachain.model"
import {SubstrateAuction} from "./substrateAuction.model"

@Entity_()
export class SubstrateParachainLeases {
  constructor(props?: Partial<SubstrateParachainLeases>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  paraId!: number

  @Index_()
  @ManyToOne_(() => SubstrateParachain, {nullable: false})
  parachain!: SubstrateParachain

  @Index_()
  @Column_("text", {nullable: false})
  leaseRange!: string

  @Column_("integer", {nullable: false})
  firstLease!: number

  @Column_("integer", {nullable: false})
  lastLease!: number

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  latestBidAmount!: bigint

  @Index_()
  @ManyToOne_(() => SubstrateAuction, {nullable: true})
  auction!: SubstrateAuction | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  activeForAuction!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  winningAmount!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  extraAmount!: bigint | undefined | null

  @Column_("text", {nullable: true})
  wonBidFrom!: string | undefined | null

  @Column_("integer", {nullable: true})
  numBlockWon!: number | undefined | null

  @Column_("integer", {nullable: true})
  winningResultBlock!: number | undefined | null

  @Index_()
  @Column_("bool", {nullable: false})
  hasWon!: boolean
}
