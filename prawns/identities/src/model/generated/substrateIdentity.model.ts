import {
  Entity as Entity_,
  Column as Column_,
  PrimaryColumn as PrimaryColumn_,
  Index as Index_,
} from 'typeorm';
import * as marshal from './marshal';
import { SubstrateNetwork } from './_substrateNetwork';
import { SubstrateIdentityAction } from './_substrateIdentityAction';

@Entity_()
export class SubstrateIdentity {
  constructor(props?: Partial<SubstrateIdentity>) {
    Object.assign(this, props);
  }

  /**
   * network:block:index
   */
  @PrimaryColumn_()
  id!: string;

  /**
   * address
   */
  @Index_()
  @Column_('text', { nullable: false })
  account!: string;

  /**
   * hex address
   */
  @Index_()
  @Column_('text', { nullable: false })
  publicKey!: string;

  @Index_()
  @Column_('varchar', { length: 8, nullable: false })
  network!: SubstrateNetwork;

  @Index_()
  @Column_('bool', { nullable: false })
  current!: boolean;

  @Column_('numeric', {
    transformer: marshal.bigintTransformer,
    nullable: false,
  })
  blockNumber!: bigint;

  @Column_('timestamp with time zone', { nullable: false })
  date!: Date;

  @Column_('varchar', { length: 5, nullable: false })
  action!: SubstrateIdentityAction;

  @Column_('text', { nullable: true })
  display!: string | undefined | null;

  @Column_('text', { nullable: true })
  email!: string | undefined | null;

  @Column_('text', { nullable: true })
  image!: string | undefined | null;

  @Column_('text', { nullable: true })
  legal!: string | undefined | null;

  @Column_('text', { nullable: true })
  pgp!: string | undefined | null;

  @Column_('text', { nullable: true })
  riot!: string | undefined | null;

  @Column_('text', { nullable: true })
  twitter!: string | undefined | null;

  @Column_('text', { nullable: true })
  web!: string | undefined | null;
}
