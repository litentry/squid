import { SubstrateProcessor } from '@subsquid/substrate-processor';
// import crowdloanContributedHandler from '../handlers/crowdloan.contributed.event';
import auctionClosedHandler from '../handlers/events/auctions.AuctionClosed';
import auctionStartedHandler from '../handlers/events/auctions.AuctionStarted';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_crowdloans_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setBlockRange({ from: 7828000 });
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'auctions.AuctionClosed',
  auctionClosedHandler(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'auctions.AuctionStarted',
  auctionStartedHandler(SubstrateNetwork.kusama)
);
// processor.addEventHandler(
//   'crowdloan.Contributed',
//   crowdloanContributedHandler(SubstrateNetwork.kusama, 0)
// );

processor.run();
