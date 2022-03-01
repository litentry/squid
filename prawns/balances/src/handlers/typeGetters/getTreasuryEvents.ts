import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { TreasuryDepositEvent as PolkadotTreasuryDepositEvent } from '../../types/polkadot/events';
import { TreasuryDepositEvent as KhalaTreasuryDepositEvent } from '../../types/khala/events';
import { TreasuryDepositEvent as KusamaTreasuryDepositEvent } from '../../types/kusama/events';

export function getTreasuryDepositEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): bigint {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryDepositEvent(ctx);

      if (event.isV1) {
        return event.asV1;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryDepositEvent(ctx);

      if (event.isV0) {
        return event.asV0;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaTreasuryDepositEvent(ctx);

      if (event.isV1020) {
        return event.asV1020;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getTreasuryDepositEvent::network not supported');
    }
  }
}
