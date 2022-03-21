import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateTip} from "./substrateTip.model"

@Entity_()
export class SubstrateTipper {
  constructor(props?: Partial<SubstrateTipper>) {
    Object.assign(this, props)
  }

  /**
   * address:hash
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

  @Index_()
  @ManyToOne_(() => SubstrateTip, {nullable: false})
  tip!: SubstrateTip

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  tipValue!: bigint
}
