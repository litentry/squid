import { SubstrateProcessor } from '@subsquid/substrate-processor';
import councilVoteHandler from '../handlers/council.vote.extrinsic';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import democracySecondHandler from '../handlers/democracy.second.extrinsic';
import electionVoteHandler from '../handlers/phragmenElection.vote.extrinsic';
import { SubstrateNetwork } from '../model';
import democracyProposedHandler from '../handlers/democracy.Proposed.event';
import councilProposedHandler from '../handlers/council.Proposed.event';

const processor = new SubstrateProcessor('litentry_squid_governance_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'phragmenElection.vote',
  electionVoteHandler(SubstrateNetwork.kusama)
);
processor.addExtrinsicHandler(
  'council.vote',
  councilVoteHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'democracy.Proposed',
  democracyProposedHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'council.Proposed',
  councilProposedHandler(SubstrateNetwork.kusama)
);
processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(SubstrateNetwork.kusama)
);
processor.addExtrinsicHandler(
  'democracy.second',
  democracySecondHandler(SubstrateNetwork.kusama)
);

processor.run();
