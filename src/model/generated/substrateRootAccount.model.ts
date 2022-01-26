import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateAccount} from "./substrateAccount.model"
import {SubstrateBalance} from "./substrateBalance.model"
import {SubstrateVote} from "./substrateVote.model"
import {SubstrateCrowdloanContribution} from "./substrateCrowdloanContribution.model"

@Entity_()
export class SubstrateRootAccount {
  constructor(props?: Partial<SubstrateRootAccount>) {
    Object.assign(this, props)
  }

  /**
   * hex address
   */
  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => SubstrateAccount, e => e.rootAccount)
  accounts!: SubstrateAccount[]

  @OneToMany_(() => SubstrateBalance, e => e.rootAccount)
  balances!: SubstrateBalance[]

  @OneToMany_(() => SubstrateVote, e => e.rootAccount)
  votes!: SubstrateVote[]

  @OneToMany_(() => SubstrateCrowdloanContribution, e => e.rootAccount)
  crowdloanContributions!: SubstrateCrowdloanContribution[]
}
