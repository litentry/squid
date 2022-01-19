import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {KhalaAccount} from "./khalaAccount.model"

@Entity_()
export class KhalaVote {
  constructor(props?: Partial<KhalaVote>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => KhalaAccount, {nullable: false})
  account!: KhalaAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date
}
