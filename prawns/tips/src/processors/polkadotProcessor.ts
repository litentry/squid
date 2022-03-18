import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsTipsNew from '../handlers/tips.tips_new.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_identities_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'tips.new_tip',
  tipsTipsNew(SubstrateNetwork.polkadot)
);
processor.run();
