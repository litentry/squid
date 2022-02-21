import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateParachain} from "./substrateParachain.model"
import {SubstrateCrowdloanContribution} from "./substrateCrowdloanContribution.model"

@Entity_()
export class SubstrateCrowdloan {
  constructor(props?: Partial<SubstrateCrowdloan>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateParachain, {nullable: false})
  parachain!: SubstrateParachain

  @Column_("text", {nullable: false})
  depositor!: string

  @Column_("text", {nullable: true})
  verifier!: string | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  cap!: bigint

  @Index_()
  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  raised!: bigint

  @Column_("integer", {nullable: false})
  lockExpiredBlock!: number

  @Column_("integer", {nullable: true})
  blockNumber!: number | undefined | null

  @Column_("integer", {nullable: false})
  firstSlot!: number

  @Column_("integer", {nullable: false})
  lastSlot!: number

  @Index_()
  @Column_("text", {nullable: false})
  status!: string

  @Column_("integer", {nullable: true})
  leaseExpiredBlock!: number | undefined | null

  @Column_("integer", {nullable: true})
  dissolvedBlock!: number | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  updatedAt!: Date | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  createdAt!: Date | undefined | null

  @Index_()
  @Column_("bool", {nullable: true})
  isFinished!: boolean | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  wonAuctionId!: string | undefined | null

  @OneToMany_(() => SubstrateCrowdloanContribution, e => e.fund)
  contributions!: SubstrateCrowdloanContribution[]
}
