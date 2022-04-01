import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateStakingActionType} from "./_substrateStakingActionType"
import {SubstrateStakingStashAccount} from "./substrateStakingStashAccount.model"
import {SubstrateStakingNominatorAccount} from "./substrateStakingNominatorAccount.model"
import {SubstrateStakingValidatorAccount} from "./substrateStakingValidatorAccount.model"

@Entity_()
export class SubstrateStakingActionHistory {
  constructor(props?: Partial<SubstrateStakingActionHistory>) {
    Object.assign(this, props)
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Index_()
  @Column_("varchar", {length: 13, nullable: false})
  action!: SubstrateStakingActionType

  @Index_()
  @ManyToOne_(() => SubstrateStakingStashAccount, {nullable: false})
  stash!: SubstrateStakingStashAccount

  @Index_()
  @ManyToOne_(() => SubstrateStakingNominatorAccount, {nullable: true})
  nominator!: SubstrateStakingNominatorAccount | undefined | null

  @Index_()
  @ManyToOne_(() => SubstrateStakingValidatorAccount, {nullable: true})
  validator!: SubstrateStakingValidatorAccount | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  date!: Date

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  amount!: bigint | undefined | null
}
