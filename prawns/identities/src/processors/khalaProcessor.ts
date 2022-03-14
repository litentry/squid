import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import identitySetHandler from '../handlers/indentity.set.identity.extrinsic';
import identityClearHandler from '../handlers/indentity.clear.identity.extrinsic';
import identityKillHandler from '../handlers/indentity.kill.identity.extrinsic';

const processor = new SubstrateProcessor('litentry_squid_identities_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'identity.set_identity',
  identitySetHandler(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'identity.clear_identity',
  identityClearHandler(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'identity.kill_identity',
  identityKillHandler(SubstrateNetwork.phala)
);
processor.run();
