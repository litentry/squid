import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsTipsNew from '../handlers/tips.tips_new.extrinsic';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_identities_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'tips.tip_new',
  tipsTipsNew(SubstrateNetwork.kusama)
);
processor.run();
