import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToOne as OneToOne_, JoinColumn as JoinColumn_} from "typeorm"
import * as marshal from "./marshal"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateStakingNominatorAccount} from "./substrateStakingNominatorAccount.model"
import {SubstrateStakingActionType} from "./_substrateStakingActionType"

@Entity_()
export class SubstrateStakingStatus {
  constructor(props?: Partial<SubstrateStakingStatus>) {
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

  @Index_({unique: true})
  @OneToOne_(() => SubstrateStakingNominatorAccount, {nullable: false})
  @JoinColumn_()
  nominator!: SubstrateStakingNominatorAccount

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  balance!: bigint

  @Column_("varchar", {length: 13, nullable: false})
  lastAction!: SubstrateStakingActionType
}
