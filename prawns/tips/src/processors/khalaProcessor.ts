import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsTipsNew from '../handlers/tips.tips_new.extrinsic';
import { SubstrateNetwork } from '../model';


const processor = new SubstrateProcessor('litentry_squid_identities_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'tips.NewTip',
  tipsTipsNew(SubstrateNetwork.phala)
);
processor.run();
