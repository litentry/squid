import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { SubstrateProcessor } from '@subsquid/substrate-processor';
import { TypeormDatabase } from '@subsquid/typeorm-store';
import identityClearIdentityHandler from './handlers/identity.clear.identity.extrinsic';
import identityKillIdentityHandler from './handlers/identity.kill.identity.extrinsic';
import identitySetIdentityHandler from './handlers/identity.set.identity.extrinsic';
import { SubstrateNetwork } from './model';

const supportedNetworks = ['kusama', 'polkadot'];
const network: SubstrateNetwork = process.env.NETWORK as SubstrateNetwork;

if (!supportedNetworks.includes(network)) {
  throw Error('Network not supported');
}

const processor = new SubstrateProcessor(new TypeormDatabase())
  .setBatchSize(500)
  .setTypesBundle(network)
  .setDataSource({
    archive: lookupArchive(network as KnownArchives, { release: 'FireSquid' }),
  })
  .addCallHandler(
    'Identities.ClearIdentity',
    identityClearIdentityHandler(network)
  )
  .addCallHandler(
    'Identities.KillIdentity',
    identityKillIdentityHandler(network)
  )
  .addCallHandler('Identities.SetIdentity', identitySetIdentityHandler(network))
  .run();
