import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TipsNewTipEvent as KhalaTipsNewTipEvent
} from '../../types/khala/events';
import {
  TipsNewTipEvent as KusamaTipsNewTipEvent
} from '../../types/kusama/events';
import {
  TipsNewTipEvent as PolkadotTipsNewTipEvent
} from '../../types/polkadot/events';


export function getTipsNewTipEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {tipHash: Uint8Array} {

  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTipsNewTipEvent(ctx);

      if (event.isV1060) {
        return {tipHash: event.asV1060};
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaTipsNewTipEvent(ctx);

      if (event.isV2028) {
        return {tipHash: event.asV2028};
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTipsNewTipEvent(ctx);

      if (event.isV28) {
        return {tipHash: event.asV28};
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getTipsNewTipEvent::network not supported');
    }
  }
}
