import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import { SubstrateNetwork } from './model';
import identitySetHandler from './handlers/identity.set.identity.extrinsic';
import identityClearHandler from './handlers/identity.clear.identity.extrinsic';
import identityKillHandler from './handlers/identity.kill.identity.extrinsic';

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
  .addCallHandler('Identity.set_identity', identitySetHandler(network))
  .addCallHandler('Identity.clear_identity', identityClearHandler(network))
  .addCallHandler('Identity.kill_identity', identityKillHandler(network))
  .run();
