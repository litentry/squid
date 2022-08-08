import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9000 from './v9000'
import * as v9071 from './v9071'

export class BalancesBalanceSetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.BalanceSet')
  }

  /**
   * A balance was set by root. \[who, free, reserved\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '0f263bfdefa394edfb38d20d33662423a2e0902235b599f9b2b0292f157f0902'
  }

  /**
   * A balance was set by root. \[who, free, reserved\]
   */
  get asV9000(): [v9000.AccountId32, bigint, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A balance was set by root.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '1e2b5d5a07046e6d6e5507661d3f3feaddfb41fc609a2336b24957322080ca77'
  }

  /**
   * A balance was set by root.
   */
  get asV9071(): {who: v9071.AccountId32, free: bigint, reserved: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, free: bigint, reserved: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Deposit')
  }

  /**
   * Some amount was deposited into the account (e.g. for transaction fees). \[who,
   * deposit\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some amount was deposited into the account (e.g. for transaction fees). \[who,
   * deposit\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV9071(): {who: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesDustLostEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.DustLost')
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss. \[account, balance\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss. \[account, balance\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get asV9071(): {account: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {account: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesEndowedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Endowed')
  }

  /**
   * An account was created with some free balance. \[account, free_balance\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * An account was created with some free balance. \[account, free_balance\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An account was created with some free balance.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
  }

  /**
   * An account was created with some free balance.
   */
  get asV9071(): {account: v9071.AccountId32, freeBalance: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {account: v9071.AccountId32, freeBalance: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesReserveRepatriatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.ReserveRepatriated')
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   * \[from, to, balance, destination_status\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '68e9ec5664c8ffe977da0c890bac43122a5cf13565c1c936e2120ba4980bcf31'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   * \[from, to, balance, destination_status\]
   */
  get asV9000(): [v9000.AccountId32, v9000.AccountId32, bigint, v9000.BalanceStatus] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV9071(): {from: v9071.AccountId32, to: v9071.AccountId32, amount: bigint, destinationStatus: v9071.BalanceStatus} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {from: v9071.AccountId32, to: v9071.AccountId32, amount: bigint, destinationStatus: v9071.BalanceStatus} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesReservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Reserved')
  }

  /**
   * Some balance was reserved (moved from free to reserved). \[who, value\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some balance was reserved (moved from free to reserved). \[who, value\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV9071(): {who: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
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
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior). \[who,
   * amount_slashed\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV9071(): {who: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get asV9000(): [v9000.AccountId32, v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV9071(): {from: v9071.AccountId32, to: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {from: v9071.AccountId32, to: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesUnreservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Unreserved')
  }

  /**
   * Some balance was unreserved (moved from reserved to free). \[who, value\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some balance was unreserved (moved from reserved to free). \[who, value\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV9071(): {who: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class BalancesWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Withdraw')
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees). \[who, value\]
   */
  get asV9000(): [v9000.AccountId32, bigint] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV9071(): {who: v9071.AccountId32, amount: bigint} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {who: v9071.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9071
  }
}

export class TreasuryAwardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Awarded')
  }

  /**
   * Some funds have been allocated. \[proposal_index, award, beneficiary\]
   */
  get isV9000(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '86708250ac506876b8d63d9c97b4ca0fa73f0199c633da6fb2a8956aaab8c743'
  }

  /**
   * Some funds have been allocated. \[proposal_index, award, beneficiary\]
   */
  get asV9000(): [number, bigint, v9000.AccountId32] {
    assert(this.isV9000)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some funds have been allocated.
   */
  get isV9071(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '998b846fdf605dfbbe27d46b36b246537b990ed6d4deb2f0177d539b9dab3878'
  }

  /**
   * Some funds have been allocated.
   */
  get asV9071(): {proposalIndex: number, award: bigint, account: v9071.AccountId32} {
    assert(this.isV9071)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9071
  }

  get asLatest(): {proposalIndex: number, award: bigint, account: v9071.AccountId32} {
    deprecateLatest()
    return this.asV9071
  }
}
