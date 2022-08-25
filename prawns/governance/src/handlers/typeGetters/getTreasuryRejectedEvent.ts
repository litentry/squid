import { SubstrateNetwork } from '../../model';
import { TreasuryRejectedEvent as KusamaTreasuryRejectedEvent } from '../../types/kusama/events';
import { TreasuryRejectedEvent as PolkadotTreasuryRejectedEvent } from '../../types/polkadot/events';
import { TreasuryRejectedEvent as KhalaTreasuryRejectedEvent } from '../../types/khala/events';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';
import { Store } from '@subsquid/typeorm-store';

export function getTreasuryRejectedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  proposalIndex: number;
  slashed: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaTreasuryRejectedEvent(ctx);

      if (event.isV1032) {
        const [proposalIndex, slashed] = event.asV1032;
        return { proposalIndex, slashed };
      }

      if (event.isV9160) {
        return event.asV9160;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryRejectedEvent(ctx);

      if (event.isV0) {
        const [proposalIndex, slashed] = event.asV0;
        return { proposalIndex, slashed };
      }

      if (event.isV9170) {
        return event.asV9170;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryRejectedEvent(ctx);

      if (event.isV1) {
        const [proposalIndex, slashed] = event.asV1;
        return { proposalIndex, slashed };
      }

      if (event.isV1110) {
        return event.asV1110;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTreasuryRejectedEvent::network not supported');
    }
  }
}
