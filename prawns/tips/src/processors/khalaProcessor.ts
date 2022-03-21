import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsTipCall from '../handlers/tips.tip.extrinsic';
import tipsTipsNewEvent from '../handlers/tips.tips_new.event';
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
  tipsTipsNewEvent(SubstrateNetwork.phala)
);
processor.addExtrinsicHandler(
  'tips.Tip',
  tipsTipCall(SubstrateNetwork.phala)
);
processor.run();
