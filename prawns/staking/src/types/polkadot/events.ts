import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

export class StakingBondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Bonded')
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Bonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has bonded this amount.
   * 
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}

export class StakingChilledEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Chilled')
  }

  /**
   *  An account has stopped participating as either a validator or nominator.
   *  \[stash\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Chilled') === '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
  }

  /**
   *  An account has stopped participating as either a validator or nominator.
   *  \[stash\]
   */
  get asV9090(): Uint8Array {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): Uint8Array {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingKickedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Kicked')
  }

  /**
   *  A nominator has been kicked from a validator. \[nominator, stash\]
   */
  get isV28(): boolean {
    return this.ctx._chain.getEventHash('staking.Kicked') === 'e54ae910805a8a9413af1a7f5885a5d0ba5f4e105175cd6b0ce2a8702ddf1861'
  }

  /**
   *  A nominator has been kicked from a validator. \[nominator, stash\]
   */
  get asV28(): [Uint8Array, Uint8Array] {
    assert(this.isV28)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV28
  }

  get asLatest(): [Uint8Array, Uint8Array] {
    deprecateLatest()
    return this.asV28
  }
}

export class StakingPayoutStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.PayoutStarted')
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.PayoutStarted') === '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV9090(): [number, Uint8Array] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [number, Uint8Array] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingRewardedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Rewarded')
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Rewarded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingSlashedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Slashed')
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV9090(): boolean {
    return this.ctx._chain.getEventHash('staking.Slashed') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9090
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV9090
  }
}

export class StakingUnbondedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'staking.Unbonded')
  }

  /**
   *  An account has unbonded this amount.
   */
  get isV0(): boolean {
    return this.ctx._chain.getEventHash('staking.Unbonded') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
  }

  /**
   *  An account has unbonded this amount.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV0
  }

  get asLatest(): [Uint8Array, bigint] {
    deprecateLatest()
    return this.asV0
  }
}
