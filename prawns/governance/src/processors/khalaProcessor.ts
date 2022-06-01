import { SubstrateProcessor } from '@subsquid/substrate-processor';
import bountiesBountyProposedHandler from "../handlers/bounties.bountyProposed.event";
import councilProposedHandler from '../handlers/council.Proposed.event';
import councilVoteHandler from '../handlers/council.vote.extrinsic';
import democracyProposedHandler from '../handlers/democracy.Proposed.event';
import democracySecondHandler from '../handlers/democracy.second.extrinsic';
import democracyVoteHandler from '../handlers/democracy.vote.extrinsic';
import electionVoteHandler from '../handlers/phragmenElection.vote.extrinsic';
import technicalCommitteeProposedHandler from '../handlers/technicalCommittee.Proposed.event';
import treasuryProposedHandler from "../handlers/treasury.proposed.event";
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_governance_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(100);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'phragmenElection.vote',
  electionVoteHandler(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'council.vote',
  councilVoteHandler(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(SubstrateNetwork.phala)
);
processor.addEventHandler(
  'democracy.Proposed',
  democracyProposedHandler(SubstrateNetwork.phala)
);
processor.addEventHandler(
  'technicalCommittee.Proposed',
  technicalCommitteeProposedHandler(SubstrateNetwork.phala)
);
processor.addEventHandler(
  'council.Proposed',
  councilProposedHandler(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'democracy.second',
  democracySecondHandler(SubstrateNetwork.phala)
);
processor.addEventHandler(
  'bounties.BountyProposed',
  bountiesBountyProposedHandler(SubstrateNetwork.phala)
);
processor.addEventHandler(
  'treasury.Proposed',
  treasuryProposedHandler(SubstrateNetwork.phala)
);

processor.run();
