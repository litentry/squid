import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"

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
}
