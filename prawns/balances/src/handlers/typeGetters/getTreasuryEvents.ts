import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TreasuryDepositEvent as PolkadotTreasuryDepositEvent,
  TreasuryAwardedEvent as PolkadotTreasuryAwardedEvent,
} from '../../types/polkadot/events';
import {
  TreasuryDepositEvent as KhalaTreasuryDepositEvent,
  TreasuryAwardedEvent as KhalaTreasuryAwardedEvent,
} from '../../types/khala/events';
import {
  TreasuryDepositEvent as KusamaTreasuryDepositEvent,
  TreasuryAwardedEvent as KudamaTreasuryAwardedEvent,
} from '../../types/kusama/events';

export function getTreasuryDepositEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): bigint {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryDepositEvent(ctx);

      if (event.isV1) {
        return event.asV1;
      } else if (event.isV1110) {
        return event.asV1110.value;
      } else {
        return event.asLatest.value;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryDepositEvent(ctx);

      if (event.isV0) {
        return event.asV0;
      } else {
        return event.asV9170.value;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaTreasuryDepositEvent(ctx);

      if (event.isV1020) {
        return event.asV1020;
      } else {
        return event.asV9160.value;
      }
    }

    default: {
      throw new Error('getTreasuryDepositEvent::network not supported');
    }
  }
}


export function getTreasuryAwardedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  award: bigint;
  account: Uint8Array;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaTreasuryAwardedEvent(ctx);

      if (event.isV1) {
        const [, award, account] = event.asV1;
        return {
          award,
          account
        };
      } else if (event.isV1110) {
        return event.asV1110;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotTreasuryAwardedEvent(ctx);

      if (event.isV0) {
        const [, award, account] = event.asV0;
        return {
          award,
          account
        };
      } else if (event.isV9170) {
        return event.asV9170;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KudamaTreasuryAwardedEvent(ctx);

      if (event.isV1020) {
        const [, award, account] = event.asV1020;
        return {
          award,
          account
        };
      } else if (event.isV9160) {
        return event.asV9160;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getTreasuryAwardedEvent::network not supported');
    }
  }
}