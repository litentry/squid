import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { IdentitySetIdentityCall as PolkadotIdentitySetIdentityCall } from '../../types/polkadot/calls';
import { IdentitySetIdentityCall as KhalaIdentitySetIdentityCall } from '../../types/khala/calls';
import { IdentitySetIdentityCall as KusamaIdentitySetIdentityCall } from '../../types/kusama/calls';

interface IdentityInfo {
  additional: [String, String][]
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
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaIdentitySetIdentityCall(ctx);
      
      if (event.isV1) {
        return formatIdentityInfo(event.asV1.info);
      } else if (event.isV1090) {
        return formatIdentityInfo(event.asV1090.info);
      } else {
        return formatIdentityInfo(event.asLatest.info);
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotIdentitySetIdentityCall(ctx);

      if (event.isV5) {
        return formatIdentityInfo(event.asV5.info);
      } else if (event.isV9110) {
        return formatIdentityInfo(event.asV9110.info);
      } else {
        return formatIdentityInfo(event.asLatest.info);
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaIdentitySetIdentityCall(ctx);

      if (event.isV1030) {
        return formatIdentityInfo(event.asV1030.info);
      } else if (event.isV1032) {
        return formatIdentityInfo(event.asV1032.info);
      } else if (event.isV9111) {
        console.log('----');
        console.log(event.isV9111);
        return formatIdentityInfo(event.asV9111.info);
      } else {
        return formatIdentityInfo(event.asLatest.info);
      }
    }

    default: {
      throw new Error('getIdentitySetIdentityCall::network not supported');
    }
  }
}

const formatIdentityInfo = (info: any): IdentityInfo => {
  return {
    additional: info.additional,
    display: info.display,
    email: info.email,
    image: info.image,
    legal: info.legal,
    pgp: info.pgpFingerprint,
    riot: info.riot,
    twitter: info.twitter,
    web: info.web,
  }
} 
