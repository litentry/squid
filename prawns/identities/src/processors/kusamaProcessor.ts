import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import identitySetHandler from '../handlers/indentity.set.identity.extrinsic';


const processor = new SubstrateProcessor('litentry_squid_identities_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'identity.set_identity',
  identitySetHandler(SubstrateNetwork.kusama)
);

processor.run();
