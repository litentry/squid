import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { IdentitySetIdentityCall as PolkadotIdentitySetIdentityCall } from '../../types/polkadot/calls';
import { IdentitySetIdentityCall as KhalaIdentitySetIdentityCall } from '../../types/khala/calls';
import { IdentitySetIdentityCall as KusamaIdentitySetIdentityCall } from '../../types/kusama/calls';
import { encodeSomething } from '../../utils/registry';
import { eventNames } from 'process';

interface IdentityInfo {
  display: String
  legal: String
  web: String
  riot: String
  email: String
  pgp: (Uint8Array | undefined)
  image: String
  twitter: String
}

export function getIdentitySetIdentityCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): IdentityInfo {

  console.log(ctx._chain.getCallHash('identity.set_identity'));
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaIdentitySetIdentityCall(ctx);
      
      if (event.isV1) {
        return formatIdentityInfo(SubstrateNetwork.phala, event.asV1.info);
      } else if (event.isV1090) {
        return formatIdentityInfo(SubstrateNetwork.phala, event.asV1090.info);
      } 
        
      return formatIdentityInfo(SubstrateNetwork.phala, event.asLatest.info);
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotIdentitySetIdentityCall(ctx);

      if (event.isV5) {
        return formatIdentityInfo(SubstrateNetwork.polkadot, event.asV5.info);
      } else if (event.isV9110) {
        return formatIdentityInfo(SubstrateNetwork.polkadot, event.asV9110.info);
      }
      
      return formatIdentityInfo(SubstrateNetwork.polkadot, event.asLatest.info);
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaIdentitySetIdentityCall(ctx);

      if (event.isV1030) {
        console.log('V1030');
        return formatIdentityInfo(SubstrateNetwork.kusama, event.asV1030.info);
      } else if (event.isV1032) {
        console.log('V1032');
        return formatIdentityInfo(SubstrateNetwork.kusama, event.asV1032.info);
      } else if (event.isV9111) {
        console.log('V9111');
        return formatIdentityInfo(SubstrateNetwork.kusama, event.asV9111.info);
      }

      return formatIdentityInfo(SubstrateNetwork.kusama, event.asLatest.info);
    }

    default: {
      throw new Error('getIdentitySetIdentityCall::network not supported');
    }
  }
}

const formatIdentityInfo = (network: SubstrateNetwork, info: any): IdentityInfo => {
  return {
    display: encodeSomething(network, info.display),
    email: encodeSomething(network, info.email),
    image: encodeSomething(network, info.image),
    legal: encodeSomething(network, info.legal),
    pgp: undefined,
    riot: encodeSomething(network, info.riot),
    twitter: encodeSomething(network, info.twitter),
    web: encodeSomething(network, info.web),
  }
} 
