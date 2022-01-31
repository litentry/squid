import { SubstrateProcessor } from '@subsquid/substrate-processor';
import crowdloanContributedHandler from '../mappings/crowdloan.contributed.event';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_polkadot');

processor.setTypesBundle('chains/polkadot/polkadotTypeDefs.json');

processor.setBatchSize(500);

processor.setDataSource({
  archive: 'https://polkadot.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://rpc.polkadot.io',
});

processor.addEventHandler(
  'crowdloan.Contributed',
  crowdloanContributedHandler(SubstrateNetwork.polkadot, 0)
);

processor.run();
