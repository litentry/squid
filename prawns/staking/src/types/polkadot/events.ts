import assert from 'assert';
import { Chain, ChainContext, EventContext, Event, Result } from './support';

export class StakingBondedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Bonded');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  An account has bonded this amount.
   *
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get isV0(): boolean {
    return (
      this._chain.getEventHash('Staking.Bonded') ===
      '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    );
  }

  /**
   *  An account has bonded this amount.
   *
   *  NOTE: This event is only emitted when funds are bonded via a dispatchable. Notably,
   *  it will not be emitted for staking rewards when they are added to stake.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingChilledEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Chilled');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  An account has stopped participating as either a validator or nominator.
   *  \[stash\]
   */
  get isV9090(): boolean {
    return (
      this._chain.getEventHash('Staking.Chilled') ===
      '21ea0c8f2488eafafdea1de92b54cd17d8b1caff525e37616abf0ff93f11531d'
    );
  }

  /**
   *  An account has stopped participating as either a validator or nominator.
   *  \[stash\]
   */
  get asV9090(): Uint8Array {
    assert(this.isV9090);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingKickedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Kicked');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  A nominator has been kicked from a validator. \[nominator, stash\]
   */
  get isV28(): boolean {
    return (
      this._chain.getEventHash('Staking.Kicked') ===
      'e54ae910805a8a9413af1a7f5885a5d0ba5f4e105175cd6b0ce2a8702ddf1861'
    );
  }

  /**
   *  A nominator has been kicked from a validator. \[nominator, stash\]
   */
  get asV28(): [Uint8Array, Uint8Array] {
    assert(this.isV28);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingPayoutStartedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.PayoutStarted');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get isV9090(): boolean {
    return (
      this._chain.getEventHash('Staking.PayoutStarted') ===
      '0379562584d6426ccff49705dfa9dba95ad94215b772fd97d0ad0c4ca0001c12'
    );
  }

  /**
   *  The stakers' rewards are getting paid. \[era_index, validator_stash\]
   */
  get asV9090(): [number, Uint8Array] {
    assert(this.isV9090);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingRewardedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Rewarded');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get isV9090(): boolean {
    return (
      this._chain.getEventHash('Staking.Rewarded') ===
      '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    );
  }

  /**
   *  The nominator has been rewarded by this amount. \[stash, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingSlashedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Slashed');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get isV9090(): boolean {
    return (
      this._chain.getEventHash('Staking.Slashed') ===
      '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    );
  }

  /**
   *  One validator (and its nominators) has been slashed by the given amount.
   *  \[validator, amount\]
   */
  get asV9090(): [Uint8Array, bigint] {
    assert(this.isV9090);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingUnbondedEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Unbonded');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  An account has unbonded this amount.
   */
  get isV0(): boolean {
    return (
      this._chain.getEventHash('Staking.Unbonded') ===
      '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    );
  }

  /**
   *  An account has unbonded this amount.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0);
    return this._chain.decodeEvent(this.event);
  }
}

export class StakingWithdrawnEvent {
  private readonly _chain: Chain;
  private readonly event: Event;

  constructor(ctx: EventContext);
  constructor(ctx: ChainContext, event: Event);
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event;
    assert(event.name === 'Staking.Withdrawn');
    this._chain = ctx._chain;
    this.event = event;
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get isV0(): boolean {
    return (
      this._chain.getEventHash('Staking.Withdrawn') ===
      '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    );
  }

  /**
   *  An account has called `withdraw_unbonded` and removed unbonding chunks worth `Balance`
   *  from the unlocking queue.
   */
  get asV0(): [Uint8Array, bigint] {
    assert(this.isV0);
    return this._chain.decodeEvent(this.event);
  }
}
