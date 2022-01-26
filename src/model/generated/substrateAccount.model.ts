import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateRootAccount} from "./substrateRootAccount.model"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateBalance} from "./substrateBalance.model"
import {SubstrateVote} from "./substrateVote.model"
import {SubstrateCrowdloanContribution} from "./substrateCrowdloanContribution.model"

@Entity_()
export class SubstrateAccount {
  constructor(props?: Partial<SubstrateAccount>) {
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
  @ManyToOne_(() => SubstrateRootAccount, {nullable: false})
  rootAccount!: SubstrateRootAccount

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("integer", {nullable: false})
  prefix!: number

  @OneToMany_(() => SubstrateBalance, e => e.account)
  balances!: SubstrateBalance[]

  @OneToMany_(() => SubstrateVote, e => e.account)
  votes!: SubstrateVote[]

  @OneToMany_(() => SubstrateCrowdloanContribution, e => e.account)
  crowdloanContributions!: SubstrateCrowdloanContribution[]

  @Column_("integer", {nullable: true})
  totalVotes!: number | undefined | null
}
