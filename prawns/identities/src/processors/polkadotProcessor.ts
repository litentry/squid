import ProcessorFactory from 'prawn-utils/lib/processorFactory';
import { SubstrateNetwork } from 'prawn-utils/lib/types';
import identityClearIdentityExtrinsic from '../handlers/identity.clear.identity.extrinsic';
import identityKillIdentityExtrinsic from '../handlers/identity.kill.identity.extrinsic';
import identitySetIdentityExtrinsic from '../handlers/identity.set.identity.extrinsic';

const prawnProcessor = ProcessorFactory('identity', SubstrateNetwork.polkadot);

prawnProcessor.addExtrinsicHandlers([
  identityClearIdentityExtrinsic,
  identityKillIdentityExtrinsic,
  identitySetIdentityExtrinsic
]);

prawnProcessor.run();