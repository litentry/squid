import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateStakingActionHistory} from "./substrateStakingActionHistory.model"

@Entity_()
export class SubstrateStakingValidatorAccount {
  constructor(props?: Partial<SubstrateStakingValidatorAccount>) {
    Object.assign(this, props)
  }

  /**
   * address:tokenSymbol
   */
  @PrimaryColumn_()
  id!: string

  /**
   * address
   */
  @Index_()
  @Column_("text", {nullable: false})
  account!: string

  /**
   * hex address
   */
  @Index_()
  @Column_("text", {nullable: false})
  rootAccount!: string

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @OneToMany_(() => SubstrateStakingActionHistory, e => e.validator)
  stakingActionHistory!: SubstrateStakingActionHistory[]
}
