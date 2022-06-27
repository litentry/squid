import assert from 'assert'
import {StorageContext, Result} from './support'
import * as v9110 from './v9110'
import * as v9140 from './v9140'
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
  get isV9110() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'Members') === 'f5df25eadcdffaa0d2a68b199d671d3921ca36a7b70d22d57506dca52b4b5895'
  }

  /**
   *  The current members of the collective. This is stored sorted (just by value).
   */
  async getAsV9110(): Promise<v9110.AccountId32[]> {
    assert(this.isV9110)
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
  get isV9110() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '63d24c0129919827fa9023228f4c71d3c81178663e2b642fce64b99d6fe01202'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9110(key: v9110.H256): Promise<v9110.Call | undefined> {
    assert(this.isV9110)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9140() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'a980d3db9298ef7abe69200e3d17617f3dd55420383735072495abe042152109'
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  async getAsV9140(key: v9140.H256): Promise<v9140.Call | undefined> {
    assert(this.isV9140)
    return this.ctx._chain.getStorage(this.ctx.block.hash, 'Council', 'ProposalOf', key)
  }

  /**
   *  Actual proposal for a given hash, if it's current.
   */
  get isV9170() {
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '964aaf0992db47aa0acde7facf84bd91d5c78634e1e31600d54c70677d103391'
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
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'd2823e296fca82e2252a5675ba825f5a72da0bce96b2e34cce4957fe8f1bd7ff'
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
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'e2bf8813ccdb37b69760fbe69e4c14449450a160d8c26913a6ac8dcbb9c51e13'
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
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === 'b25e5e64765e176b26e807e5ff3c226fc90c96075a31031903939a23abbd12eb'
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
    return this.ctx._chain.getStorageItemTypeHash('Council', 'ProposalOf') === '22422b0582b7112b4065b3d6dddf5afe1e4852ca1809e8bd77a9344947c2d3e9'
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
