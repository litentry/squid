import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  TreasuryAwardedEvent as KhalaTreasuryAwardedEvent,
  TreasuryDepositEvent as KhalaTreasuryDepositEvent,
} from '../../types/khala/events';
import {
  TreasuryAwardedEvent as LitentryTreasuryAwardedEvent,
  TreasuryDepositEvent as LitentryTreasuryDepositEvent,
} from '../../types/litentry/events';

import {
  TreasuryAwardedEvent as LitmusTreasuryAwardedEvent,
  TreasuryDepositEvent as LitmusTreasuryDepositEvent,
} from '../../types/litmus/events';

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

    case SubstrateNetwork.litmus: {
      const event = new LitmusTreasuryDepositEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }

      if (event.isV9031) {
        return event.asV9031.value;
      }

      return event.asLatest.value;
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryTreasuryDepositEvent(ctx);

      if (event.isV9000) {
        return event.asV9000;
      }

      if (event.isV9071) {
        return event.asV9071.value;
      }

      return event.asLatest.value;
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
          account,
        };
      } else if (event.isV1110) {
        return event.asV1110;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusTreasuryAwardedEvent(ctx);

      if (event.isV9020) {
        const [, award, account] = event.asV9020;
        return {
          award,
          account,
        };
      }

      if (event.isV9031) {
        return event.asV9031;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryTreasuryAwardedEvent(ctx);

      if (event.isV9000) {
        const [, award, account] = event.asV9000;
        return {
          award,
          account,
        };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }
    default: {
      throw new Error('getTreasuryAwardedEvent::network not supported');
    }
  }
}
