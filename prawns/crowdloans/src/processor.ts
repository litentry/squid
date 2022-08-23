import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import crowdloanContributedHandler from './handlers/crowdloan.contributed.event';
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
  .addEventHandler(
    'Crowdloan.Contributed',
    crowdloanContributedHandler(SubstrateNetwork.polkadot, 0)
  )
  .run();
