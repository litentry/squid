import { SubstrateProcessor } from '@subsquid/substrate-processor';
import crowdloanContributedHandler from '../handlers/crowdloan.contributed.event';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'crowdloan.Contributed',
  crowdloanContributedHandler(SubstrateNetwork.polkadot, 0)
);
processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.polkadot, 0)
);
processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(SubstrateNetwork.polkadot)
);

processor.run();
