import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateDemocracyProposal} from "./substrateDemocracyProposal.model"
import {SubstrateDemocracyReferendaStatus} from "./_substrateDemocracyReferendaStatus"
import {SubstrateDemocracyReferendaVote} from "./substrateDemocracyReferendaVote.model"

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

  @Column_("varchar", {length: 9, nullable: false})
  status!: SubstrateDemocracyReferendaStatus

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Column_("text", {nullable: false})
  voteThreshold!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  aye!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  nay!: bigint

  @OneToMany_(() => SubstrateDemocracyReferendaVote, e => e.democracyReferenda)
  votes!: SubstrateDemocracyReferendaVote[]
}
