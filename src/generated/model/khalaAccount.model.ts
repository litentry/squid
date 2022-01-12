import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "../marshal"
import {KhalaTransfer} from "./khalaTransfer.model"

@Entity_()
export class KhalaAccount {
  constructor(props?: Partial<KhalaAccount>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferInTimestamp!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferInBlockNumber!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferOutTimestamp!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  firstTransferOutBlockNumber!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferInTimestamp!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferInBlockNumber!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferOutTimestamp!: bigint | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  lastTransferOutBlockNumber!: bigint | undefined | null

  @OneToMany_(() => KhalaTransfer, e => e.to)
  transfersTo!: KhalaTransfer[]

  @OneToMany_(() => KhalaTransfer, e => e.from)
  transfersFrom!: KhalaTransfer[]
}
