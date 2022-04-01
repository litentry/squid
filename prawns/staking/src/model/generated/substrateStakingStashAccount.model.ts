import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateStakingNominatorAccount} from "./substrateStakingNominatorAccount.model"
import {SubstrateStakingValidatorAccount} from "./substrateStakingValidatorAccount.model"

@Entity_()
export class SubstrateStakingStashAccount {
  constructor(props?: Partial<SubstrateStakingStashAccount>) {
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

  @Index_()
  @ManyToOne_(() => SubstrateStakingNominatorAccount, {nullable: false})
  nominator!: SubstrateStakingNominatorAccount

  @Index_()
  @ManyToOne_(() => SubstrateStakingValidatorAccount, {nullable: false})
  validator!: SubstrateStakingValidatorAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint
}
