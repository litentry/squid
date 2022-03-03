import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { IdentityIdentitySetEvent as PolkadotIdentityIdentitySetEvent } from '../../types/polkadot/events';
import { IdentityIdentitySetEvent as KhalaIdentityIdentitySetEvent } from '../../types/khala/events';
import { IdentityIdentitySetEvent as KusamaIdentityIdentitySetEvent } from '../../types/kusama/events';

export function getIdentityIdentitySetEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): { 
  who: Uint8Array
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaIdentityIdentitySetEvent(ctx);
      
      if (event.isV1) {
        return { who: event.asV1 };
      } if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotIdentityIdentitySetEvent(ctx);

      if (event.isV5) {
        return { who: event.asV5 };
      } if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaIdentityIdentitySetEvent(ctx);

      if (event.isV1030) {
        return { who: event.asV1030 };
      } if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getIdentityIdentitySetEvent::network not supported');
    }
  }
}
