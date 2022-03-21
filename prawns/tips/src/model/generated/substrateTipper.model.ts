import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
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

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Index_()
  @ManyToOne_(() => SubstrateTip, {nullable: false})
  tip!: SubstrateTip

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  tipValue!: bigint
}
