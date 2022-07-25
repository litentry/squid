import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyTabledEvent as KusamaDemocracyTabledEvent } from '../../types/kusama/events';
import { DemocracyTabledEvent as PolkadotDemocracyTabledEvent } from '../../types/polkadot/events';
import { DemocracyTabledEvent as KhalaDemocracyTabledEvent } from '../../types/khala/events';

export function getDemocracyTabledEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): { proposalIndex: number; deposit: bigint; depositors: Uint8Array[] } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyTabledEvent(ctx);

      if (event.isV1020) {
        const [proposalIndex, deposit, depositors] = event.asV1020;
        return { proposalIndex, deposit, depositors };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyTabledEvent(ctx);

      if (event.isV0) {
        const [proposalIndex, deposit, depositors] = event.asV0;
        return { proposalIndex, deposit, depositors };
      }

      if (event.isV9140) {
        return event.asV9140;
      }
      return event.asLatest;
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyTabledEvent(ctx);

      if (event.isV1) {
        const [proposalIndex, deposit, depositors] = event.asV1;
        return { proposalIndex, deposit, depositors };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('network not supported');
    }
  }
}
