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
import councilApprovedEventHandler from "../handlers/council.Approved.event";
import councilClosedEventHandler from "../handlers/council.Closed.event";
import councilExecutedEventHandler from "../handlers/council.Executed.event";
import democracyTabledEventHandler from '../handlers/democracy.Tabled.event';
import democracyStartedEventHandler from '../handlers/democracy.Started.event';
import democracyPassedEventHandler from '../handlers/democracy.Passed.event';
import democracyNotPassedEventHandler from '../handlers/democracy.NotPassed.event';
import democracyCancelledEventHandler from '../handlers/democracy.Cancelled.event';
import democracyExecutedEventHandler from '../handlers/democracy.Executed.event';
import democracyClearPublicProposalsExtrinsicHandler from '../handlers/democracy.ClearPublicProposals.extrinsic';

const processor = new SubstrateProcessor('litentry_squid_governance_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(100);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});

const network = SubstrateNetwork.phala;

processor.addExtrinsicHandler(
  'phragmenElection.vote',
  electionVoteHandler(network)
);
processor.addExtrinsicHandler(
  'council.vote',
  councilVoteHandler(network)
);
processor.addExtrinsicHandler(
  'democracy.vote',
  democracyVoteHandler(network)
);
processor.addEventHandler(
  'democracy.Proposed',
  democracyProposedHandler(network)
);
processor.addEventHandler(
  'technicalCommittee.Proposed',
  technicalCommitteeProposedHandler(network)
);
processor.addEventHandler(
  'council.Proposed',
  councilProposedHandler(network)
);
processor.addExtrinsicHandler(
  'democracy.second',
  democracySecondHandler(network)
);
processor.addEventHandler(
  'bounties.BountyProposed',
  bountiesBountyProposedHandler(network)
);
processor.addEventHandler(
  'treasury.Proposed',
  treasuryProposedHandler(network)
);
processor.addEventHandler(
  'council.Approved',
  councilApprovedEventHandler(network)
);
processor.addEventHandler(
  'council.Closed',
  councilClosedEventHandler(network)
);
processor.addEventHandler(
  'council.Executed',
  councilExecutedEventHandler(network)
);
processor.addEventHandler(
  'democracy.Tabled',
  democracyTabledEventHandler(network)
);
processor.addEventHandler(
  'democracy.Started',
  democracyStartedEventHandler(network)
);
processor.addExtrinsicHandler(
  'democracy.clear_public_proposals',
  {
    triggerEvents: ['treasury.Deposit'] // For some reason this extrinsic does not have a 'system.ExtrinsicSuccess' event that Subsquid looks for to trigger the handler
  },
  democracyClearPublicProposalsExtrinsicHandler(network)
);
processor.addEventHandler(
  'democracy.Passed',
  democracyPassedEventHandler(network)
);
processor.addEventHandler(
  'democracy.NotPassed',
  democracyNotPassedEventHandler(network)
);
processor.addEventHandler(
  'democracy.Cancelled',
  democracyCancelledEventHandler(network)
);
processor.addEventHandler(
  'democracy.Executed',
  democracyExecutedEventHandler(network)
);

processor.run();
