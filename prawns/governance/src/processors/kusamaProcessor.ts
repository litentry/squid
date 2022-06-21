import { SubstrateProcessor } from '@subsquid/substrate-processor';
import councilVoteHandler from '../handlers/council.vote.extrinsic';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import democracySecondHandler from '../handlers/democracy.second.extrinsic';
import electionVoteHandler from '../handlers/phragmenElection.vote.extrinsic';
import { SubstrateNetwork } from '../model';
import democracyProposedHandler from '../handlers/democracy.Proposed.event';
import councilProposedHandler from '../handlers/council.Proposed.event';
import technicalCommitteeProposedHandler from '../handlers/technicalCommittee.Proposed.event';
import bountiesBountyProposedHandler from "../handlers/bounties.bountyProposed.event";
import treasuryProposedHandler from "../handlers/treasury.proposed.event";
import councilApprovedEventHandler from "../handlers/council.Approved.event";
import councilClosedEventHandler from "../handlers/council.Closed.event";
import councilExecutedEventHandler from "../handlers/council.Executed.event";

const processor = new SubstrateProcessor('litentry_squid_governance_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(100);
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
  'technicalCommittee.Proposed',
  technicalCommitteeProposedHandler(SubstrateNetwork.kusama)
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
processor.addEventHandler(
  'bounties.BountyProposed',
  bountiesBountyProposedHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'treasury.Proposed',
  treasuryProposedHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'council.Approved',
  councilApprovedEventHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'council.Closed',
  councilClosedEventHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'council.Executed',
  councilExecutedEventHandler(SubstrateNetwork.kusama)
);

processor.run();
