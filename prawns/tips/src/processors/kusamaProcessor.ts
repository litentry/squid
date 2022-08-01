import { SubstrateProcessor } from '@subsquid/substrate-processor';
import tipsStatusEvent from '../handlers/tips.status.event';
import tipsTipCall from '../handlers/tips.tip.extrinsic';
import tipsTipsNewEvent from '../handlers/tips.tips_new.event';
import { SubstrateNetwork } from '../model';
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { lookupArchive } from '@subsquid/archive-registry';


const processor = new SubstrateProcessor(new TypeormDatabase());

processor.setTypesBundle('kusama');
processor.setBatchSize(10);
processor.setDataSource({
  archive: lookupArchive("kusama", { release: "FireSquid" })
})
processor.addEventHandler(
  'tips.NewTip',
  tipsTipsNewEvent(SubstrateNetwork.kusama)
);
processor.addCallHandler(
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
