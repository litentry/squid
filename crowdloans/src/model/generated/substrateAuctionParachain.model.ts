import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {SubstrateAuction} from "./substrateAuction.model"
import {SubstrateParachain} from "./substrateParachain.model"

@Entity_()
export class SubstrateAuctionParachain {
  constructor(props?: Partial<SubstrateAuctionParachain>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateAuction, {nullable: false})
  auction!: SubstrateAuction

  @Index_()
  @ManyToOne_(() => SubstrateParachain, {nullable: false})
  parachain!: SubstrateParachain

  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("integer", {nullable: false})
  firstSlot!: number

  @Column_("integer", {nullable: false})
  lastSlot!: number
}
