// import { SubstrateProcessor } from '@subsquid/substrate-processor';
// import crowdloanContributedHandler from '../handlers/crowdloan.contributed.event';
// import { SubstrateNetwork } from '../model';

// const processor = new SubstrateProcessor('litentry_squid_crowdloans_polkadot');

// processor.setTypesBundle('polkadot');
// processor.setBatchSize(500);
// processor.setIsolationLevel('REPEATABLE READ');
// processor.setBlockRange({ from: 7554350 });
// processor.setDataSource({
//   archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
//   chain: 'wss://polkadot.api.onfinality.io/public-ws',
// });
// processor.addEventHandler(
//   'crowdloan.Contributed',
//   crowdloanContributedHandler(SubstrateNetwork.polkadot, 0)
// );

// processor.run();
