export enum ConfigChainsEnum {
  'polkadot' = 'polkadot',
  'khala' = 'khala',
  'kusama' = 'kusama',
  'moonbeam' = 'moonbeam'
}

export interface ConfigInterface {
  chains: {
    [key in ConfigChainsEnum]: {
      chain: string,
      archive: string
    }
  }
}

export default {
  chains: {
    polkadot: {
      chain: 'wss://polkadot.api.onfinality.io/public-ws',
      archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
    },
    khala: {
      chain: 'wss://khala.api.onfinality.io/public-ws',
      archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
    },
    kusama: {
      chain: 'wss://kusama.api.onfinality.io/public-ws',
      archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
    },
    moonbeam: {
      chain: 'wss://moonbeam.api.onfinality.io/public-ws',
      archive: 'https://moonbeam.indexer.gc.subsquid.io/v4/graphql',
    },
  },
} as ConfigInterface
