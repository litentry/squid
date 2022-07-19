import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v1 from './v1'
import * as v1090 from './v1090'
import * as v1091 from './v1091'
import * as v1100 from './v1100'
import * as v1110 from './v1110'
import * as v1120 from './v1120'
import * as v1130 from './v1130'
import * as v1140 from './v1140'
import * as v1150 from './v1150'
import * as v1160 from './v1160'

export class CouncilMembersStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  get isV1090() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  async getAsV1090(): Promise<v1090.AccountId32[]> {
    assert(this.isV1090)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'Members')
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'Members') != null
  }
}

export class CouncilProposalOfStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1090() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '537dad11796faf19810ccfbf8a1d2c19215a44d1e9ad981701a66c34420c752c'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1090(key: v1090.H256): Promise<v1090.Call | undefined> {
    assert(this.isV1090)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1091() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'a03a393fd493fecc428d40abd74f28b1815c247b321a4699be8da9c8cee022ed'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1091(key: v1091.H256): Promise<v1091.Call | undefined> {
    assert(this.isV1091)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1100() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '940dd00f3b70b20f467fdf8562b942f0780b9c8c16ca7848a5940c7345338254'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1100(key: v1100.H256): Promise<v1100.Call | undefined> {
    assert(this.isV1100)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1110() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'fdc0d9f02348b6d618d66d6b2ff5fccb2fe8bf50d6ebfd935e22ae8930cabeb4'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1110(key: v1110.H256): Promise<v1110.Call | undefined> {
    assert(this.isV1110)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1120() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '39317e6ddad4f03bc8bbebe7eca67e988222d21cb85d21b798e56a7731818dcd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1120(key: v1120.H256): Promise<v1120.Call | undefined> {
    assert(this.isV1120)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1130() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '4fd93a6729b0072bde2d669f6f84eea9ffb9dcd1c1ca1076aa3db4cb368749b3'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1130(key: v1130.H256): Promise<v1130.Call | undefined> {
    assert(this.isV1130)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1140() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'f9c4dcd3e156b528c1400b5a26cbb465afcc3d9d3503c4e1e990f6f0ef681679'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1140(key: v1140.H256): Promise<v1140.Call | undefined> {
    assert(this.isV1140)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1150() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '7e69118168e841db4b04747c9b56e802a9fdeaaa8f355f5bd7b6d23875d966bb'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1150(key: v1150.H256): Promise<v1150.Call | undefined> {
    assert(this.isV1150)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV1160() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '2a3dc418bc01a1dedbe5b5f8f1745e5c03ee6d01902d04f3b208495de3496bbf'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV1160(key: v1160.H256): Promise<v1160.Call | undefined> {
    assert(this.isV1160)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') != null
  }
}

export class DemocracyPreimagesStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  get isV1() {
    return this.ctx._chain.getStorageItemTypeHash('Democracy', 'Preimages') === '0e0e3c0f32264d14a97bb80cf16ecda808e2404f87100dc025cf84cfcc821fef'
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  async getAsV1(key: Uint8Array): Promise<v1.PreimageStatus | undefined> {
    assert(this.isV1)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Democracy', 'Preimages', key)
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  get isV1090() {
    return this.ctx._chain.getStorageItemTypeHash('Democracy', 'Preimages') === '2762abd948712e87f9324ca0c5ad1523f92ac946c587c97414ce71252440341f'
  }

  /**
   *  Map of hashes to the proposal preimage, along with who registered it and their deposit.
   *  The block number is the block at which it was deposited.
   */
  async getAsV1090(key: v1090.H256): Promise<v1090.PreimageStatus | undefined> {
    assert(this.isV1090)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Democracy', 'Preimages', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Democracy', 'Preimages') != null
  }
}
