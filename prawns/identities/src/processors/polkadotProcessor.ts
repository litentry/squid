import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import identitySetHandler from '../handlers/indentity.set.identity.extrinsic';

const processor = new SubstrateProcessor('litentry_squid_identities_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'identity.set_identity',
  identitySetHandler(SubstrateNetwork.polkadot)
);
processor.run();
