import assert from 'assert'
import {CallContext, Result, deprecateLatest} from './support'
import * as v1201 from './v1201'
import * as v900 from './v900'

export class EthereumTransactCall {
  constructor(private ctx: CallContext) {
    assert(this.ctx.extrinsic.name === 'ethereum.transact')
  }

  /**
   * Transact an Ethereum transaction.
   */
  get isV900(): boolean {
    return this.ctx._chain.getCallHash('ethereum.transact') === '82652d5fdf5feff4c45f1fcad6a37c1859acf213b47bc66c29c124d9fde90611'
  }

  /**
   * Transact an Ethereum transaction.
   */
  get asV900(): {transaction: v900.LegacyTransaction} {
    assert(this.isV900)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  /**
   * Transact an Ethereum transaction.
   */
  get isV1201(): boolean {
    return this.ctx._chain.getCallHash('ethereum.transact') === '3cbef8f4fc5092a9774dbdc59e85322a1c15e3f1e5e8a849256963a8ebe44352'
  }

  /**
   * Transact an Ethereum transaction.
   */
  get asV1201(): {transaction: v1201.TransactionV2} {
    assert(this.isV1201)
    return this.ctx._chain.decodeCall(this.ctx.extrinsic)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV1201
  }

  get asLatest(): {transaction: v1201.TransactionV2} {
    deprecateLatest()
    return this.asV1201
  }
}
