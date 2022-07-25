import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { PhragmenElectionNewTermEvent as KusamaPhragmenElectionNewTermEvent } from '../../types/kusama/events';
import { PhragmenElectionNewTermEvent as PolkadotPhragmenElectionNewTermEvent } from '../../types/polkadot/events';
import { PhragmenElectionNewTermEvent as KhalaPhragmenElectionNewTermEvent } from '../../types/khala/events';

export function getPhragmenElectionNewTermEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  newMembers: [Uint8Array, bigint][];
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaPhragmenElectionNewTermEvent(ctx);
      if (event.isV9010) {
        return { newMembers: event.asV9010 };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotPhragmenElectionNewTermEvent(ctx);

      if (event.isV9050) {
        return { newMembers: event.asV9050 };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaPhragmenElectionNewTermEvent(ctx);

      if (event.isV14) {
        return { newMembers: event.asV14 };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getPhragmenElectionNewTermEvent::network not supported');
    }
  }
}
