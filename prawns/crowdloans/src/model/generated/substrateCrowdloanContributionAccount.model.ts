import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateCrowdloanContribution} from "./substrateCrowdloanContribution.model"

@Entity_()
export class SubstrateCrowdloanContributionAccount {
  constructor(props?: Partial<SubstrateCrowdloanContributionAccount>) {
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

  @OneToMany_(() => SubstrateCrowdloanContribution, e => e.account)
  crowdloanContributions!: SubstrateCrowdloanContribution[]

  @Column_("integer", {nullable: false})
  totalCrowdloanContributions!: number
}
