import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class SubstrateCrowdloanSequence {
  constructor(props?: Partial<SubstrateCrowdloanSequence>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("integer", {nullable: false})
  curIndex!: number

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("integer", {nullable: false})
  blockNumber!: number
}
