import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {KhalaAccount} from "./khalaAccount.model"

@Entity_()
export class KhalaTransfer {
  constructor(props?: Partial<KhalaTransfer>) {
    Object.assign(this, props)
  }

  /**
   * blockNumber-eventIndex
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => KhalaAccount, {nullable: false})
  to!: KhalaAccount

  @Index_()
  @ManyToOne_(() => KhalaAccount, {nullable: false})
  from!: KhalaAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  amount!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  tip!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date
}
