import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateTipper} from "./substrateTipper.model"

@Entity_()
export class SubstrateTip {
  constructor(props?: Partial<SubstrateTip>) {
    Object.assign(this, props)
  }

  /**
   * hash
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

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("text", {nullable: false})
  who!: string

  @Column_("text", {nullable: true})
  finder!: string | undefined | null

  @Column_("text", {nullable: false})
  reason!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  tipValue!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deposit!: bigint

  @OneToMany_(() => SubstrateTipper, e => e.tip)
  tippers!: SubstrateTipper[]
}
