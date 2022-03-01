import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v2008 from './v2008'
import * as v9122 from './v9122'
import * as v9130 from './v9130'

export class BalancesBalanceSetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.BalanceSet')
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get isV1031(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '890be9c0740650f86b325a08fc07ecc4c2b4f58212c6edaca87dabdbb64d3db1'
  }

  /**
   *  A balance was set by root (who, free, reserved).
   */
  get asV1031(): [Uint8Array, bigint, bigint] {
    assert(this.isV1031)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A balance was set by root.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '4ab45d6d95726adfeb725535bf55a2406d3b4d8ae14ac9005c7bd7e07ea76fcc'
  }

  /**
   * A balance was set by root.
   */
  get asV9130(): {who: v9130.AccountId32, free: bigint, reserved: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, free: bigint, reserved: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Deposit')
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get isV1032(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === 'cf0c633b4d95aa1626767eef7c869b6d51b4e864772aceeb18ec2d4ebd8a9101'
  }

  /**
   *  Some amount was deposited (e.g. for transaction fees).
   */
  get asV1032(): [Uint8Array, bigint] {
    assert(this.isV1032)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === '3e10f037979c6bc49d783be86e7fa6eb9642f270ffedf3352fae03a41fcf22e4'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV9130(): {who: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesDustLostEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.DustLost')
  }

  /**
   *  An account was removed whose balance was non-zero but below ExistentialDeposit,
   *  resulting in an outright loss.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === 'cc03bf0e885d06ab5165f4598e72250fd3e16bc5ba4dbb099deae1a97e4bef09'
  }

  /**
   *  An account was removed whose balance was non-zero but below ExistentialDeposit,
   *  resulting in an outright loss.
   */
  get asV1050(): [Uint8Array, bigint] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === '10bbf3b0d3ec83ccf1a23f056e1a60d4f66be59072296b48ebf9172ffcdab3f6'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get asV9130(): {account: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {account: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesEndowedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Endowed')
  }

  /**
   *  An account was created with some free balance.
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '1b1c107d9931735af253054e543179401a9ff7b0beaee7fa7aa61319dc40a290'
  }

  /**
   *  An account was created with some free balance.
   */
  get asV1050(): [Uint8Array, bigint] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was created with some free balance.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '089e94580955109582764033c0ac689ca378b9d2d399441102b094e72be986e7'
  }

  /**
   * An account was created with some free balance.
   */
  get asV9130(): {account: v9130.AccountId32, freeBalance: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {account: v9130.AccountId32, freeBalance: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesReserveRepatriatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.ReserveRepatriated')
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get isV2008(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '823db0df51a00ee6479e9d206981c4cb7b4afcdfb66f2b1626a9c053026a511e'
  }

  /**
   *  Some balance was moved from the reserve of the first account to the second account.
   *  Final argument indicates the destination balance type.
   */
  get asV2008(): [Uint8Array, Uint8Array, bigint, v2008.BalanceStatus] {
    assert(this.isV2008)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '1dac0fc1bd585ad6dd890e892bed23d70ca0545bf18fa96b4ce0ba7f3ffcdbd1'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV9130(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint, destinationStatus: v9130.BalanceStatus} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint, destinationStatus: v9130.BalanceStatus} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesReservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Reserved')
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get isV2008(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'c595c2f71b423f0c1e0798ad69320278f19e727a480f58f312a585980145cf22'
  }

  /**
   *  Some balance was reserved (moved from free to reserved).
   */
  get asV2008(): [Uint8Array, bigint] {
    assert(this.isV2008)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'bc321147cc9b824c85c432ac3c753b1319c9ad37babdd0e09ae0f99aeecc9360'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV9130(): {who: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Slashed')
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get isV9122(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === '2483fc82edb5fdb0ff716405ceadec93041e61656d52a5eccaa1ae00b97e532b'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get asV9122(): [v9122.AccountId32, bigint] {
    assert(this.isV9122)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === '087119b0d937e152a3831b84db573c85f89c84a6fd587673ee923c9f0061ed66'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV9130(): {who: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '154fca303841d334782de2e871e3572f786f81f86e2a6153c2b9e8dc6fc27422'
  }

  /**
   *  Transfer succeeded (from, to, value, fees).
   */
  get asV1020(): [Uint8Array, Uint8Array, bigint, bigint] {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get isV1050(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '9611bd6b933331f197e8fa73bac36184681838292120987fec97092ae037d1c8'
  }

  /**
   *  Transfer succeeded (from, to, value).
   */
  get asV1050(): [Uint8Array, Uint8Array, bigint] {
    assert(this.isV1050)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '99bc4786247456e0d4a44373efe405e598bfadfac87a7c41b0a82a91296836c1'
  }

  /**
   * Transfer succeeded.
   */
  get asV9130(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {from: v9130.AccountId32, to: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesUnreservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Unreserved')
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get isV2008(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'ab01310b8e7de989b74305e42be550e888c6563ed4ea284f7c56ae7d79566f8c'
  }

  /**
   *  Some balance was unreserved (moved from reserved to free).
   */
  get asV2008(): [Uint8Array, bigint] {
    assert(this.isV2008)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'be12b7473ab82e15891b929b20269451c731ffad981836a76ca0aae115b9e9f6'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV9130(): {who: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class BalancesWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Withdraw')
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get isV9122(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === 'c817a046dc9663596372188650f4e0b0897f9149bbc73435595dee84b7a9b049'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get asV9122(): [v9122.AccountId32, bigint] {
    assert(this.isV9122)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get isV9130(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === '7d47465a5bcac497a2c0e813fe27069aff5d6086a74365c4f40bc0d5332e1356'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV9130(): {who: v9130.AccountId32, amount: bigint} {
    assert(this.isV9130)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9130
  }

  get asLatest(): {who: v9130.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9130
  }
}

export class TreasuryDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Deposit')
  }

  /**
   *  Some funds have been deposited.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('treasury.Deposit') === '00a6b2996298e567aad20092952a8a74feec74cde3e7a57572700c49512f941d'
  }

  /**
   *  Some funds have been deposited.
   */
  get asV1020(): bigint {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): bigint {
    deprecateLatest()
    return this.asV1020
  }
}
