import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateAuction} from "./substrateAuction.model"
import {SubstrateParachain} from "./substrateParachain.model"

@Entity_()
export class SubstrateChronicle {
  constructor(props?: Partial<SubstrateChronicle>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateAuction, {nullable: true})
  curAuction!: SubstrateAuction | undefined | null

  @Column_("integer", {nullable: true})
  curBlockNumber!: number | undefined | null

  @Column_("integer", {nullable: true})
  curLease!: number | undefined | null

  @Column_("integer", {nullable: true})
  curLeaseStart!: number | undefined | null

  @Column_("integer", {nullable: true})
  curLeaseEnd!: number | undefined | null

  @OneToMany_(() => SubstrateParachain, e => e.chronicle)
  parachains!: SubstrateParachain[]
}
