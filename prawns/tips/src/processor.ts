import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import tipsStatusEvent from './handlers/tips.status.event';
import tipsTipCall from './handlers/tips.tip.extrinsic';
import tipsTipsNewEvent from './handlers/tips.tips_new.event';
import { SubstrateNetwork } from './model';

const supportedNetworks = ['kusama', 'polkadot', 'khala'];
const network: SubstrateNetwork = process.env.NETWORK as SubstrateNetwork;

if (!supportedNetworks.includes(network)) {
  throw Error('Network not supported');
}

new SubstrateProcessor(new TypeormDatabase())
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive(network as KnownArchives, { release: 'FireSquid' }),
  })
  .addCallHandler('Tips.tip', tipsTipCall(network))
  .addEventHandler('Tips.NewTip', tipsTipsNewEvent(network))
  .addEventHandler('Tips.TipClosed', tipsStatusEvent(network))
  .addEventHandler('Tips.TipClosing', tipsStatusEvent(network))
  .addEventHandler('Tips.TipRetracted', tipsStatusEvent(network))
  .addEventHandler('Tips.TipSlashed', tipsStatusEvent(network))
  .run();
