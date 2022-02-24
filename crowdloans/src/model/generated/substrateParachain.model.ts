import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateParachainLeases} from "./substrateParachainLeases.model"
import {SubstrateBid} from "./substrateBid.model"
import {SubstrateCrowdloan} from "./substrateCrowdloan.model"
import {SubstrateAuctionChronicle} from "./substrateAuctionChronicle.model"

@Entity_()
export class SubstrateParachain {
  constructor(props?: Partial<SubstrateParachain>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  paraId!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("integer", {nullable: false})
  creationBlock!: number

  @Column_("bool", {nullable: false})
  deregistered!: boolean

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deposit!: bigint

  @Column_("text", {nullable: false})
  manager!: string

  @OneToMany_(() => SubstrateParachainLeases, e => e.parachain)
  leases!: SubstrateParachainLeases[]

  @OneToMany_(() => SubstrateBid, e => e.parachain)
  bids!: SubstrateBid[]

  @OneToMany_(() => SubstrateCrowdloan, e => e.parachain)
  funds!: SubstrateCrowdloan[]

  @Index_()
  @ManyToOne_(() => SubstrateAuctionChronicle, {nullable: true})
  chronicle!: SubstrateAuctionChronicle | undefined | null
}
