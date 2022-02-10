import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_khala');

processor.setTypesBundle('khala');

processor.setBatchSize(500);

processor.setIsolationLevel('REPEATABLE READ');

processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
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
