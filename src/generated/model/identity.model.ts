import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "../marshal"

@Entity_()
export class Identity {
  constructor(props?: Partial<Identity>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  address!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  deposit!: bigint

  @Column_("text", {nullable: false})
  display!: string

  @Column_("text", {nullable: true})
  legal!: string | undefined | null

  @Column_("text", {nullable: true})
  web!: string | undefined | null

  @Column_("text", {nullable: true})
  riot!: string | undefined | null

  @Column_("text", {nullable: true})
  email!: string | undefined | null

  @Column_("text", {nullable: true})
  image!: string | undefined | null

  @Column_("text", {nullable: true})
  twitter!: string | undefined | null

  @Column_("text", {nullable: true})
  pgpFingerprint!: string | undefined | null

  @Column_("text", {array: true, nullable: true})
  additional!: (string | undefined | null)[] | undefined | null
}
