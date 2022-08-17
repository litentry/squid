import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import councilApprovedEventHandler from './handlers/council.Approved.event';
import councilClosedEventHandler from './handlers/council.Closed.event';
import councilExecutedEventHandler from './handlers/council.Executed.event';
import councilProposedHandler from './handlers/council.Proposed.event';
import councilVoteHandler from './handlers/council.vote.extrinsic';
import electionVoteHandler from './handlers/phragmenElection.vote.extrinsic';
// import bountiesBountyProposedHandler from './handlers/Bounties.bountyProposed.event';
import democracyCancelProposalExtrinsicHandler from './handlers/Democracy.CancelProposal.extrinsic';
import democracyProposedHandler from './handlers/Democracy.Proposed.event';
import democracySecondHandler from './handlers/Democracy.second.extrinsic';
import democracyVoteHandler from './handlers/Democracy.vote.extrinsic';
// import technicalCommitteeProposedHandler from './handlers/TechnicalCommittee.Proposed.event';
// import democracyTabledEventHandler from './handlers/Democracy.Tabled.event';
// import democracyStartedEventHandler from './handlers/Democracy.Started.event';
// import democracyPassedEventHandler from './handlers/Democracy.Passed.event';
// import democracyNotPassedEventHandler from './handlers/Democracy.NotPassed.event';
// import democracyCancelledEventHandler from './handlers/Democracy.Cancelled.event';
// import democracyExecutedEventHandler from './handlers/Democracy.Executed.event';
// import democracyClearPublicProposalsExtrinsicHandler from './handlers/Democracy.ClearPublicProposals.extrinsic';
// import democracyPreimageNotedEvent from './handlers/Democracy.PreimageNoted.event';
import PhragmenElectionNewTermEvent from './handlers/PhragmenElection.NewTerm.event';
import treasuryAwardedEvent from './handlers/Treasury.awarded.event';
import treasuryProposedHandler from './handlers/Treasury.proposed.event';
import treasuryRejectedEvent from './handlers/Treasury.rejected.event';
import { SubstrateNetwork } from './model';

const supportedNetworks = ['kusama', 'polkadot', 'khala'];
const network: SubstrateNetwork = process.env.NETWORK as SubstrateNetwork;

if (!supportedNetworks.includes(network)) {
  throw Error('Network not supported');
}

new SubstrateProcessor(new TypeormDatabase())
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive(network as KnownArchives, { release: 'FireSquid' }),
    chain: `wss://${network}.api.onfinality.io/public-ws`,
  })
  .addCallHandler('PhragmenElection.vote', electionVoteHandler(network))
  .addEventHandler('Council.Proposed', councilProposedHandler(network))
  .addCallHandler('Council.vote', councilVoteHandler(network))
  .addEventHandler('Council.Approved', councilApprovedEventHandler(network))
  .addEventHandler('Council.Closed', councilClosedEventHandler(network))
  .addEventHandler('Council.Executed', councilExecutedEventHandler(network))
  .addEventHandler('Democracy.Proposed', democracyProposedHandler(network))
  .addCallHandler('Democracy.vote', democracyVoteHandler(network))
  .addCallHandler('Democracy.second', democracySecondHandler(network))
  .addCallHandler(
    'Democracy.cancel_proposal',
    democracyCancelProposalExtrinsicHandler(network)
  )
  // .addEventHandler(
  //   'TechnicalCommittee.Proposed',
  //   technicalCommitteeProposedHandler(network)
  // )
  // .addEventHandler(
  //   'Bounties.BountyProposed',
  //   bountiesBountyProposedHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.Tabled',
  //   democracyTabledEventHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.Started',
  //   democracyStartedEventHandler(network)
  // )
  // .addCallHandler(
  //   'Democracy.clear_public_proposals',
  //   {
  //     triggerEvents: ['Treasury.Deposit'] // For some reason this extrinsic does not have a 'system.ExtrinsicSuccess' event that Subsquid looks for to trigger the handler
  //   },
  //   democracyClearPublicProposalsExtrinsicHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.Passed',
  //   democracyPassedEventHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.NotPassed',
  //   democracyNotPassedEventHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.Cancelled',
  //   democracyCancelledEventHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.Executed',
  //   democracyExecutedEventHandler(network)
  // )
  // .addEventHandler(
  //   'Democracy.PreimageNoted',
  //   democracyPreimageNotedEvent(network)
  // )
  .addEventHandler('Treasury.Proposed', treasuryProposedHandler(network))
  .addEventHandler('Treasury.Awarded', treasuryAwardedEvent(network))
  .addEventHandler('Treasury.Rejected', treasuryRejectedEvent(network))
  .addEventHandler(
    'PhragmenElection.NewTerm',
    PhragmenElectionNewTermEvent(network)
  )
  .run();
