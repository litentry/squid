import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {KhalaTransfer} from "./khalaTransfer.model"
import {KhalaVote} from "./khalaVote.model"

@Entity_()
export class KhalaAccount {
  constructor(props?: Partial<KhalaAccount>) {
    Object.assign(this, props)
  }

  /**
   * address
   */
  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("timestamp with time zone", {nullable: true})
  firstTransferInDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferInBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  firstTransferOutDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferOutBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  lastTransferInDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferInBlockNumber!: bigint | undefined | null

  @Column_("timestamp with time zone", {nullable: true})
  lastTransferOutDate!: Date | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferOutBlockNumber!: bigint | undefined | null

  @OneToMany_(() => KhalaTransfer, e => e.to)
  transfersTo!: KhalaTransfer[]

  @OneToMany_(() => KhalaTransfer, e => e.from)
  transfersFrom!: KhalaTransfer[]

  @OneToMany_(() => KhalaVote, e => e.account)
  votes!: KhalaVote[]

  @Column_("integer", {nullable: true})
  totalVotes!: number | undefined | null
}
