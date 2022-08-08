import { EventHandler, ExtrinsicHandler, SubstrateProcessor } from '@subsquid/substrate-processor';

export enum SubstrateNetwork {
  kusama = 'kusama',
  polkadot = 'polkadot',
  phala = 'phala',
}

export interface PrawnEventHandler {
  getEventNames(): string[],
  getHandler(chain: SubstrateNetwork): EventHandler
}

export interface PrawnExtrinsicHandler {
  getExtrinsicNames(): string[],
  getHandler(chain: SubstrateNetwork): ExtrinsicHandler
}