import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v9020 from './v9020'
import * as v9031 from './v9031'

export class BalancesBalanceSetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.BalanceSet')
  }

  /**
   * A balance was set by root.
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.BalanceSet') === '1e2b5d5a07046e6d6e5507661d3f3feaddfb41fc609a2336b24957322080ca77'
  }

  /**
   * A balance was set by root.
   */
  get asV9020(): {who: v9020.AccountId32, free: bigint, reserved: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, free: bigint, reserved: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Deposit')
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Deposit') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was deposited (e.g. for transaction fees).
   */
  get asV9020(): {who: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesDustLostEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.DustLost')
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.DustLost') === '504f155afb2789c50df19d1f747fb2dc0e99bf8b7623c30bdb5cf82029fec760'
  }

  /**
   * An account was removed whose balance was non-zero but below ExistentialDeposit,
   * resulting in an outright loss.
   */
  get asV9020(): {account: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {account: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesEndowedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Endowed')
  }

  /**
   * An account was created with some free balance.
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Endowed') === '75951f685df19cbb5fdda09cf928a105518ceca9576d95bd18d4fac8802730ca'
  }

  /**
   * An account was created with some free balance.
   */
  get asV9020(): {account: v9020.AccountId32, freeBalance: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {account: v9020.AccountId32, freeBalance: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesReserveRepatriatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.ReserveRepatriated')
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.ReserveRepatriated') === '6232d50d422cea3a6fd21da36387df36d1d366405d0c589566c6de85c9cf541f'
  }

  /**
   * Some balance was moved from the reserve of the first account to the second account.
   * Final argument indicates the destination balance type.
   */
  get asV9020(): {from: v9020.AccountId32, to: v9020.AccountId32, amount: bigint, destinationStatus: v9020.BalanceStatus} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {from: v9020.AccountId32, to: v9020.AccountId32, amount: bigint, destinationStatus: v9020.BalanceStatus} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesReservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Reserved')
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Reserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was reserved (moved from free to reserved).
   */
  get asV9020(): {who: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Slashed')
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Slashed') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was removed from the account (e.g. for misbehavior).
   */
  get asV9020(): {who: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   * Transfer succeeded.
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV9020(): {from: v9020.AccountId32, to: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {from: v9020.AccountId32, to: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesUnreservedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Unreserved')
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Unreserved') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some balance was unreserved (moved from reserved to free).
   */
  get asV9020(): {who: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class BalancesWithdrawEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Withdraw')
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('balances.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
  }

  /**
   * Some amount was withdrawn from the account (e.g. for transaction fees).
   */
  get asV9020(): {who: v9020.AccountId32, amount: bigint} {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9020
  }

  get asLatest(): {who: v9020.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV9020
  }
}

export class TreasuryAwardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Awarded')
  }

  /**
   * Some funds have been allocated. \[proposal_index, award, beneficiary\]
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '86708250ac506876b8d63d9c97b4ca0fa73f0199c633da6fb2a8956aaab8c743'
  }

  /**
   * Some funds have been allocated. \[proposal_index, award, beneficiary\]
   */
  get asV9020(): [number, bigint, v9020.AccountId32] {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some funds have been allocated.
   */
  get isV9031(): boolean {
    return this.ctx._chain.getEventHash('treasury.Awarded') === '998b846fdf605dfbbe27d46b36b246537b990ed6d4deb2f0177d539b9dab3878'
  }

  /**
   * Some funds have been allocated.
   */
  get asV9031(): {proposalIndex: number, award: bigint, account: v9031.AccountId32} {
    assert(this.isV9031)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9031
  }

  get asLatest(): {proposalIndex: number, award: bigint, account: v9031.AccountId32} {
    deprecateLatest()
    return this.asV9031
  }
}

export class TreasuryDepositEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'treasury.Deposit')
  }

  /**
   * Some funds have been deposited. \[deposit\]
   */
  get isV9020(): boolean {
    return this.ctx._chain.getEventHash('treasury.Deposit') === '47b59f698451e50cce59979f0121e842fa3f8b2bcef2e388222dbd69849514f9'
  }

  /**
   * Some funds have been deposited. \[deposit\]
   */
  get asV9020(): bigint {
    assert(this.isV9020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Some funds have been deposited.
   */
  get isV9031(): boolean {
    return this.ctx._chain.getEventHash('treasury.Deposit') === 'd74027ad27459f17d7446fef449271d1b0dc12b852c175623e871d009a661493'
  }

  /**
   * Some funds have been deposited.
   */
  get asV9031(): {value: bigint} {
    assert(this.isV9031)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9031
  }

  get asLatest(): {value: bigint} {
    deprecateLatest()
    return this.asV9031
  }
}
