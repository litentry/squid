import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {SubstrateEvmContract} from "./substrateEvmContract.model"
import {SubstrateNetwork} from "./_substrateNetwork"

@Entity_()
export class SubstrateEvmContractSignature {
  constructor(props?: Partial<SubstrateEvmContractSignature>) {
    Object.assign(this, props)
  }

  /**
   * contractAddress:methodId
   */
  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => SubstrateEvmContract, {nullable: false})
  contract!: SubstrateEvmContract

  @Index_()
  @Column_("text", {nullable: false})
  contractType!: string

  @Index_()
  @Column_("text", {nullable: false})
  signatureId!: string

  @Index_()
  @Column_("text", {nullable: true})
  signatureName!: string | undefined | null

  @Column_("text", {nullable: false})
  signatureType!: string

  @Index_()
  @Column_("varchar", {length: 8, nullable: false})
  network!: SubstrateNetwork
}
