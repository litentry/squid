import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyExecutedEvent as KusamaDemocracyExecutedEvent } from '../../types/kusama/events';
import { DemocracyExecutedEvent as PolkadotDemocracyExecutedEvent } from '../../types/polkadot/events';
import { DemocracyExecutedEvent as KhalaDemocracyExecutedEvent } from '../../types/khala/events';
import { Result } from '../../types/khala/support';

export function getDemocracyExecutedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {refIndex: number, result: Result<null, any>} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyExecutedEvent(ctx);
      
      if (event.isV1020) {
        return handleLegacyArrayBoolFormat(event.asV1020);
      }
      if (event.isV9160) {
        return event.asV9160;
      }
      if (event.isV9111) {
        const [refIndex, result] = event.asV9111;
        return {refIndex, result};
      }
      if (event.isV9090) {
        const [refIndex, result] = event.asV9090;
        return {refIndex, result};
      }
      if (event.isV9170) {
        return event.asV9170;
      }
      if (event.isV9130) {
        return event.asV9130;
      }
      if (event.isV9190) {
        return event.asV9190;
      }
      
      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyExecutedEvent(ctx);

      if (event.isV0) {
        return handleLegacyArrayBoolFormat(event.asV0);
      }
      if (event.isV9190) {
        return event.asV9190;
      }
      if (event.isV9170) {
        return event.asV9170;
      }
      if (event.isV9090) {
        const [refIndex, result] = event.asV9090;
        return {refIndex, result};
      }
      if (event.isV9140) {
        return event.asV9140;
      }
      if (event.isV9110) {
        const [refIndex, result] = event.asV9110;
        return {refIndex, result};
      }

      return event.asLatest;

    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyExecutedEvent(ctx);

      if (event.isV1) {
        return handleLegacyArrayBoolFormat(event.asV1);
      }
      if (event.isV1090) {
        return event.asV1090;
      }
      if (event.isV1120) {
        return event.asV1120;
      }
      if (event.isV1110) {
        return event.asV1110;
      }
      if (event.isV14) {
        const [refIndex, result] = event.asV14;
        return {refIndex, result};
      }
      if (event.isV1140) {
        return event.asV1140;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getDemocracyExecutedEvent::network not supported');
    }
  }
}

const handleLegacyArrayBoolFormat = ([refIndex, success]: [number, boolean]): {refIndex: number, result: Result<null, any>}  => ({ refIndex, result: success ? { __kind: 'Ok', value: null } : { __kind: 'Err', value: 'Failed' } });