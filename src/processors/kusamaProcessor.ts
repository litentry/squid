import { SubstrateProcessor } from '@subsquid/substrate-processor';
import crowdloanContributedHandler from '../mappings/crowdloan.contributed.event';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_polkadot');

processor.setTypesBundle('chains/kusama/kusamaTypeDefs.json');

processor.setBatchSize(500);

processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});

processor.addEventHandler(
  'crowdloan.Contributed',
  crowdloanContributedHandler(SubstrateNetwork.kusama, 0)
);

processor.run();
