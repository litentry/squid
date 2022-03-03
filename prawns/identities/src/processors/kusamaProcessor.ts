import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import identitySetHandler from '../handlers/indentity.set.event';


const processor = new SubstrateProcessor('litentry_squid_identities_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'identity.IdentitySet',
  identitySetHandler(SubstrateNetwork.kusama)
);

processor.run();
