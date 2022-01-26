import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../mappings/balances.transfer.event';
import democracyVoteHandler from '../mappings/democracy.vote.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_khala');

processor.setTypesBundle('chains/khala/khalaTypeDefs.json');

processor.setBatchSize(500);

processor.setDataSource({
  archive: 'https://khala.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});

processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.phala, 0)
);

processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(SubstrateNetwork.phala)
);

processor.run();
