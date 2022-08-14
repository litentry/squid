import { SubstrateNetwork } from '../../model';
import { TreasuryAwardedEvent as KusamaTreasuryAwardedEvent } from '../../types/kusama/events';
import { TreasuryAwardedEvent as PolkadotTreasuryAwardedEvent } from '../../types/polkadot/events';
import { TreasuryAwardedEvent as KhalaTreasuryAwardedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';
import { Store } from '@subsquid/typeorm-store';

export function getTreasuryAwardedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  proposalIndex: number;
  award: bigint;
  account: Uint8Array;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaTreasuryAwardedEvent(ctx);

      if (event.isV1020) {
        const [proposalIndex, award, account] = event.asV1020;
        return { proposalIndex, award, account };
      }

      if (event.isV9160) {
        return event.asV9160;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryAwardedEvent(ctx);

      if (event.isV0) {
        const [proposalIndex, award, account] = event.asV0;
        return { proposalIndex, award, account };
      }

      if (event.isV9170) {
        return event.asV9170;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryAwardedEvent(ctx);

      if (event.isV1) {
        const [proposalIndex, award, account] = event.asV1;
        return { proposalIndex, award, account };
      }

      if (event.isV1110) {
        return event.asV1110;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTreasuryAwardedEvent::network not supported');
    }
  }
}
