import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateDemocracyProposal} from "./substrateDemocracyProposal.model"

@Entity_()
export class SubstrateDemocracyReferenda {
  constructor(props?: Partial<SubstrateDemocracyReferenda>) {
    Object.assign(this, props)
  }

  /**
   * network:referendaIndex
   */
  @PrimaryColumn_()
  id!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Index_()
  @ManyToOne_(() => SubstrateDemocracyProposal, {nullable: true})
  democracyProposal!: SubstrateDemocracyProposal | undefined | null

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("text", {nullable: true})
  title!: string | undefined | null

  @Column_("text", {nullable: true})
  description!: string | undefined | null

  @Column_("text", {nullable: false})
  status!: string

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Column_("text", {nullable: false})
  voteThreshold!: string
}
