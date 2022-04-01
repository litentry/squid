import { SubstrateProcessor } from '@subsquid/substrate-processor';
import stakingBondedEvent from '../handlers/staking.bonded.event';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_identities_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'staking.Bonded',
  stakingBondedEvent(SubstrateNetwork.kusama, 0)
);
processor.run();
