import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, OneToMany as OneToMany_} from "typeorm"
import {SubstrateNetwork} from "./_substrateNetwork"
import {SubstrateEvmContractSignature} from "./substrateEvmContractSignature.model"

@Entity_()
export class SubstrateEvmContract {
  constructor(props?: Partial<SubstrateEvmContract>) {
    Object.assign(this, props)
  }

  /**
   * contractAddress
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @Column_("text", {nullable: false})
  type!: string

  @Index_({unique: true})
  @Column_("text", {nullable: false})
  evmTxHash!: string

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork

  @OneToMany_(() => SubstrateEvmContractSignature, e => e.contract)
  signatures!: SubstrateEvmContractSignature[]
}
