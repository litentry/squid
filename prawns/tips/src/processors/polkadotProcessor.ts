import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsStatusEvent from '../handlers/tips.status.event';
import tipsTipCall from '../handlers/tips.tip.extrinsic';
import tipsTipsNewEvent from '../handlers/tips.tips_new.event';
import { SubstrateNetwork } from '../model';


const processor = new SubstrateProcessor('litentry_squid_identities_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(10);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'tips.NewTip',
  tipsTipsNewEvent(SubstrateNetwork.polkadot)
);
processor.addExtrinsicHandler(
  'tips.Tip',
  tipsTipCall(SubstrateNetwork.polkadot)
);
processor.addEventHandler(
  'tips.TipClosed',
  tipsStatusEvent(SubstrateNetwork.polkadot)
);
processor.addEventHandler(
  'tips.TipClosing',
  tipsStatusEvent(SubstrateNetwork.polkadot)
);
processor.addEventHandler(
  'tips.TipRetracted',
  tipsStatusEvent(SubstrateNetwork.polkadot)
);
processor.addEventHandler(
  'tips.TipSlashed',
  tipsStatusEvent(SubstrateNetwork.polkadot)
);
processor.run();
