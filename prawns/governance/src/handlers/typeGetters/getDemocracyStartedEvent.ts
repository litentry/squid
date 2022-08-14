import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyStartedEvent as KusamaDemocracyStartedEvent } from '../../types/kusama/events';
import { DemocracyStartedEvent as PolkadotDemocracyStartedEvent } from '../../types/polkadot/events';
import { DemocracyStartedEvent as KhalaDemocracyStartedEvent } from '../../types/khala/events';
import { Store } from '@subsquid/typeorm-store';

export function getDemocracyStartedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { refIndex: number; thresholdKind: string } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyStartedEvent(ctx);

      if (event.isV1020) {
        const [refIndexParam, thresholdParam] = ctx.event.args as unknown as [
          { value: number },
          { value: string }
        ];
        return {
          refIndex: refIndexParam.value,
          thresholdKind: thresholdParam.value,
        };

        // Subsquid is  choking on a type - workaround above
        // const [refIndex, threshold] = event.asV1020;
        // return { refIndex, thresholdKind: threshold.__kind };
      }

      if (event.isV9130) {
        return {
          refIndex: event.asV9130.refIndex,
          thresholdKind: event.asV9130.threshold.__kind,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyStartedEvent(ctx);

      if (event.isV0) {
        const [refIndexParam, thresholdParam] = ctx.event.args as unknown as [
          { value: number },
          { value: string }
        ];
        return {
          refIndex: refIndexParam.value,
          thresholdKind: thresholdParam.value,
        };

        // Subsquid is  choking on a type - workaround above
        // const [refIndex, threshold] = event.asV0;
        // return { refIndex, thresholdKind: threshold.__kind };
      }

      if (event.isV9140) {
        return {
          refIndex: event.asV9140.refIndex,
          thresholdKind: event.asV9140.threshold.__kind,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyStartedEvent(ctx);

      if (event.isV1) {
        const [refIndex, threshold] = event.asV1;
        return { refIndex, thresholdKind: threshold.__kind };
      }

      if (event.isV1090) {
        return {
          refIndex: event.asV1090.refIndex,
          thresholdKind: event.asV1090.threshold.__kind,
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('network not supported');
    }
  }
}
