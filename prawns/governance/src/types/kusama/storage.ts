import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v9111 from './v9111'
import * as v9122 from './v9122'
import * as v9130 from './v9130'
import * as v9160 from './v9160'
import * as v9170 from './v9170'
import * as v9180 from './v9180'
import * as v9190 from './v9190'
import * as v9220 from './v9220'
import * as v9230 from './v9230'

export class CouncilMembersStorage {
  constructor(private ctx: StorageContext) {}

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  get isV9111() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  async getAsV9111(): Promise<v9111.AccountId32[]> {
    assert(this.isV9111)
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
  get isV9111() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '54e55db1bed5771689c23398470e3d79c164300b3002e905baf8a07324946142'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9111(key: v9111.H256): Promise<v9111.Call | undefined> {
    assert(this.isV9111)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9122() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '35e9c06eaf393488c6b16cf365c09693bf1c81cc6d198b6016c29648cb8b11db'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9122(key: v9122.H256): Promise<v9122.Call | undefined> {
    assert(this.isV9122)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9130() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '771a0827eb13fc4190ea879c908b28cd46e50cc4eea92ce695433a0d34417fd2'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9130(key: v9130.H256): Promise<v9130.Call | undefined> {
    assert(this.isV9130)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9160() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '836dba8139435bbad397865c8087e909e07155ca6789f28117be9be78a76f03a'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9160(key: v9160.H256): Promise<v9160.Call | undefined> {
    assert(this.isV9160)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9170() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '981edb925a6901db31fe53126d4c3e9d318989d80da8eeb384d62bb46163e280'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9170(key: v9170.H256): Promise<v9170.Call | undefined> {
    assert(this.isV9170)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9180() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '6a2618971629efc0cc2b9299f5ea8071f2a98eb975d38abbfe1179b62abbfdcd'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9180(key: v9180.H256): Promise<v9180.Call | undefined> {
    assert(this.isV9180)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9190() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '81b65eb804da3365d8cdd24c14cfc9e7b042151c9f94f42b7210ef3337145243'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9190(key: v9190.H256): Promise<v9190.Call | undefined> {
    assert(this.isV9190)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9220() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '4498453a1226fec5bf63af9bd29732d3c48e950007698929b56326f760588995'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9220(key: v9220.H256): Promise<v9220.Call | undefined> {
    assert(this.isV9220)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9230() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'd6b4ad7daa1db1517b2381936dabdd2ed8c3ce2050c863710e8134aa93c75b17'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9230(key: v9230.H256): Promise<v9230.Call | undefined> {
    assert(this.isV9230)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') != null
  }
}
