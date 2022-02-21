import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateBid} from "./substrateBid.model"
import {SubstrateParachainLeases} from "./substrateParachainLeases.model"

@Entity_()
export class SubstrateAuction {
  constructor(props?: Partial<SubstrateAuction>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  blockNumber!: number

  @Index_()
  @Column_("text", {nullable: false})
  status!: string

  @OneToMany_(() => SubstrateBid, e => e.auction)
  bids!: SubstrateBid[]

  @Column_("integer", {nullable: true})
  leaseStart!: number | undefined | null

  @Column_("integer", {nullable: false})
  slotsStart!: number

  @Column_("integer", {nullable: true})
  leaseEnd!: number | undefined | null

  @Column_("integer", {nullable: false})
  slotsEnd!: number

  @Column_("integer", {nullable: false})
  closingStart!: number

  @Column_("integer", {nullable: false})
  closingEnd!: number

  @Column_("integer", {nullable: true})
  resultBlock!: number | undefined | null

  @Index_()
  @Column_("bool", {nullable: false})
  ongoing!: boolean

  @OneToMany_(() => SubstrateParachainLeases, e => e.auction)
  parachainLeases!: SubstrateParachainLeases[]
}
