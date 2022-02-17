import { SubstrateProcessor } from '@subsquid/substrate-processor';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_governance_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(SubstrateNetwork.kusama)
);

processor.run();
