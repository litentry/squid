import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsStatusEvent from '../handlers/tips.status.event';
import tipsTipCall from '../handlers/tips.tip.extrinsic';
import tipsTipsNewEvent from '../handlers/tips.tips_new.event';
import { SubstrateNetwork } from '../model';


const processor = new SubstrateProcessor('litentry_squid_tips_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(10);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'tips.NewTip',
  tipsTipsNewEvent(SubstrateNetwork.kusama)
);
processor.addExtrinsicHandler(
  'tips.Tip',
  tipsTipCall(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'tips.TipClosed',
  tipsStatusEvent(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'tips.TipClosing',
  tipsStatusEvent(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'tips.TipRetracted',
  tipsStatusEvent(SubstrateNetwork.kusama)
);
processor.addEventHandler(
  'tips.TipSlashed',
  tipsStatusEvent(SubstrateNetwork.kusama)
);
processor.run();
