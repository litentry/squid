import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'

export class AuctionsAuctionClosedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'auctions.AuctionClosed')
  }

  /**
   *  An auction ended. All funds become unreserved. [auction_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('auctions.AuctionClosed') === 'fdcb56e53c2eee0a5ba9d908763e3ef3ab819d6fecbfbd5f474ad1557539977b'
  }

  /**
   *  An auction ended. All funds become unreserved. [auction_index]
   */
  get asV9010(): number {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): number {
    deprecateLatest()
    return this.asV9010
  }
}

export class AuctionsAuctionStartedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'auctions.AuctionStarted')
  }

  /**
   *  An auction started. Provides its index and the block number where it will begin to
   *  close and the first lease period of the quadruplet that is auctioned.
   *  [auction_index, lease_period, ending]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('auctions.AuctionStarted') === 'e1644b8dd09defba3c2837a62c9b939e6a6f3a0bc708ae22df33b6a026887ab8'
  }

  /**
   *  An auction started. Provides its index and the block number where it will begin to
   *  close and the first lease period of the quadruplet that is auctioned.
   *  [auction_index, lease_period, ending]
   */
  get asV9010(): [number, number, number] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [number, number, number] {
    deprecateLatest()
    return this.asV9010
  }
}

export class AuctionsBidAcceptedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'auctions.BidAccepted')
  }

  /**
   *  A new bid has been accepted as the current winner.
   *  \[who, para_id, amount, first_slot, last_slot\]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('auctions.BidAccepted') === 'bc789b4b76fb843a27ce74117be7edbea148012712f22922d0d75e772aaf4168'
  }

  /**
   *  A new bid has been accepted as the current winner.
   *  \[who, para_id, amount, first_slot, last_slot\]
   */
  get asV9010(): [Uint8Array, number, bigint, number, number] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [Uint8Array, number, bigint, number, number] {
    deprecateLatest()
    return this.asV9010
  }
}

export class AuctionsWinningOffsetEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'auctions.WinningOffset')
  }

  /**
   *  The winning offset was chosen for an auction. This will map into the `Winning` storage map.
   *  \[auction_index, block_number\]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('auctions.WinningOffset') === '5cb35ae3c5998107c65167938b186b12dd3b5dcb2ce5065d4dfdfc30e4bcf5d2'
  }

  /**
   *  The winning offset was chosen for an auction. This will map into the `Winning` storage map.
   *  \[auction_index, block_number\]
   */
  get asV9010(): [number, number] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [number, number] {
    deprecateLatest()
    return this.asV9010
  }
}

export class CrowdloanContributedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Contributed')
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Contributed') === 'd943dbc2818504a7c969bb6b64a01f7217f0321441ab3f4ec6efeed498414ca4'
  }

  /**
   *  Contributed to a crowd sale. [who, fund_index, amount]
   */
  get asV9010(): [Uint8Array, number, bigint] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [Uint8Array, number, bigint] {
    deprecateLatest()
    return this.asV9010
  }
}

export class CrowdloanCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Created')
  }

  /**
   *  Create a new crowdloaning campaign. [fund_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Created') === '06134b22c03f7cf6e0274993c5c5d5dd7515ecf8930c7616462642e1616e5f04'
  }

  /**
   *  Create a new crowdloaning campaign. [fund_index]
   */
  get asV9010(): number {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): number {
    deprecateLatest()
    return this.asV9010
  }
}

export class CrowdloanDissolvedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'crowdloan.Dissolved')
  }

  /**
   *  Fund is dissolved. [fund_index]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('crowdloan.Dissolved') === '54d8d8c3e443fe2deb6899a99e70eeaac03db01683e93755bb1275f0448b0403'
  }

  /**
   *  Fund is dissolved. [fund_index]
   */
  get asV9010(): number {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): number {
    deprecateLatest()
    return this.asV9010
  }
}

export class RegistrarRegisteredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'registrar.Registered')
  }

  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('registrar.Registered') === 'b280f076e2a062a5844db00000ebf19bad4e9992fb44c4a3c5bbe8f17b59cab0'
  }

  get asV9010(): [number, Uint8Array] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [number, Uint8Array] {
    deprecateLatest()
    return this.asV9010
  }
}

export class SlotsLeasedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'slots.Leased')
  }

  /**
   *  An existing parachain won the right to continue.
   *  First balance is the extra amount reseved. Second is the total amount reserved.
   *  \[parachain_id, leaser, period_begin, period_count, extra_reseved, total_amount\]
   */
  get isV9010(): boolean {
    return this.ctx._chain.getEventHash('slots.Leased') === '8b53f052740a2206f4e117dabd6e9a35fb5b288087131337ac74ed3ce0fb3d9a'
  }

  /**
   *  An existing parachain won the right to continue.
   *  First balance is the extra amount reseved. Second is the total amount reserved.
   *  \[parachain_id, leaser, period_begin, period_count, extra_reseved, total_amount\]
   */
  get asV9010(): [number, Uint8Array, number, number, bigint, bigint] {
    assert(this.isV9010)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV9010
  }

  get asLatest(): [number, Uint8Array, number, number, bigint, bigint] {
    deprecateLatest()
    return this.asV9010
  }
}

export class SlotsNewLeasePeriodEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'slots.NewLeasePeriod')
  }

  /**
   *  A new lease period is beginning.
   */
  get isV1020(): boolean {
    return this.ctx._chain.getEventHash('slots.NewLeasePeriod') === '0abde01f662330187aa5cee2a9a7a9442f750b6a6513630c04fa0e237777c3fd'
  }

  /**
   *  A new lease period is beginning.
   */
  get asV1020(): number {
    assert(this.isV1020)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1020
  }

  get asLatest(): number {
    deprecateLatest()
    return this.asV1020
  }
}
