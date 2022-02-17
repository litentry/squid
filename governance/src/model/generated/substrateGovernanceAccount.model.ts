import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateVote} from "./substrateVote.model"

@Entity_()
export class SubstrateGovernanceAccount {
  constructor(props?: Partial<SubstrateGovernanceAccount>) {
    Object.assign(this, props)
  }

  /**
   * address
   */
  @PrimaryColumn_()
  id!: string

  /**
   * hex address
   */
  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("integer", {nullable: false})
  totalVotes!: number

  @OneToMany_(() => SubstrateVote, e => e.account)
  votes!: SubstrateVote[]
}
