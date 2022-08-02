import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  BalancesBalanceSetEvent as KhalaBalancesBalanceSetEvent,
  BalancesDepositEvent as KhalaBalancesDepositEvent,
  BalancesDustLostEvent as KhalaBalancesDustLostEvent,
  BalancesEndowedEvent as KhalaBalancesEndowedEvent,
  BalancesReservedEvent as KhalaBalancesReservedEvent,
  BalancesReserveRepatriatedEvent as KhalaBalancesReserveRepatriatedEvent,
  BalancesSlashedEvent as KhalaBalancesSlashedEvent,
  BalancesTransferEvent as KhalaBalancesTransferEvent,
  BalancesUnreservedEvent as KhalaBalancesUnreservedEvent,
  BalancesWithdrawEvent as KhalaBalancesWithdrawEvent,
} from '../../types/khala/events';
import {
  BalancesBalanceSetEvent as LitentryBalancesBalanceSetEvent,
  BalancesDepositEvent as LitentryBalancesDepositEvent,
  BalancesDustLostEvent as LitentryBalancesDustLostEvent,
  BalancesEndowedEvent as LitentryBalancesEndowedEvent,
  BalancesReservedEvent as LitentryBalancesReservedEvent,
  BalancesReserveRepatriatedEvent as LitentryBalancesReserveRepatriatedEvent,
  BalancesSlashedEvent as LitentryBalancesSlashedEvent,
  BalancesTransferEvent as LitentryBalancesTransferEvent,
  BalancesUnreservedEvent as LitentryBalancesUnreservedEvent,
  BalancesWithdrawEvent as LitentryBalancesWithdrawEvent,
} from '../../types/litentry/events';
import {
  BalancesBalanceSetEvent as LitmusBalancesBalanceSetEvent,
  BalancesDepositEvent as LitmusBalancesDepositEvent,
  BalancesDustLostEvent as LitmusBalancesDustLostEvent,
  BalancesEndowedEvent as LitmusBalancesEndowedEvent,
  BalancesReservedEvent as LitmusBalancesReservedEvent,
  BalancesReserveRepatriatedEvent as LitmusBalancesReserveRepatriatedEvent,
  BalancesSlashedEvent as LitmusBalancesSlashedEvent,
  BalancesTransferEvent as LitmusBalancesTransferEvent,
  BalancesUnreservedEvent as LitmusBalancesUnreservedEvent,
  BalancesWithdrawEvent as LitmusBalancesWithdrawEvent,
} from '../../types/litmus/events';

export function getBalancesBalanceSetEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  free: bigint;
  reserved: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesBalanceSetEvent(ctx);

      if (event.isV1) {
        const [who, free, reserved] = event.asV1;
        return { who, free, reserved };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesBalanceSetEvent(ctx);
      if (event.isV9000) {
        const [who, free, reserved] = event.asV9000;
        return { who, free, reserved };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesBalanceSetEvent(ctx);
      if (event.isV9020) {
        return event.asV9020;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesBalanceSetEvent::network not supported');
    }
  }
}

export function getBalancesDepositEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesDepositEvent(ctx);

      if (event.isV1) {
        const [who, amount] = event.asV1;
        return { who, amount };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesDepositEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesDepositEvent(ctx);
      if (event.isV9000) {
        const [who, amount] = event.asV9000;
        return { who, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesDepositEvent::network not supported');
    }
  }
}

export function getBalancesDustLostEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesDustLostEvent(ctx);

      if (event.isV1) {
        const [account, amount] = event.asV1;
        return { account, amount };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesDustLostEvent(ctx);
      if (event.isV9000) {
        const [account, amount] = event.asV9000;
        return { account, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesDustLostEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesDustLostEvent::network not supported');
    }
  }
}

export function getBalancesEndowedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  freeBalance: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesEndowedEvent(ctx);

      if (event.isV1) {
        const [account, freeBalance] = event.asV1;
        return { account, freeBalance };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesEndowedEvent(ctx);
      if (event.isV9000) {
        const [account, freeBalance] = event.asV9000;
        return { account, freeBalance };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesEndowedEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesEndowedEvent::network not supported');
    }
  }
}

export function getBalancesReservedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesReservedEvent(ctx);

      if (event.isV1) {
        const [who, amount] = event.asV1;
        return { who, amount };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesReservedEvent(ctx);
      if (event.isV9000) {
        const [who, amount] = event.asV9000;
        return { who, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesReservedEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesReservedEvent::network not supported');
    }
  }
}

export function getBalancesReserveRepatriatedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
  destinationStatus: { __kind: 'Free' | 'Reserved' };
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesReserveRepatriatedEvent(ctx);

      if (event.isV1) {
        const [from, to, amount, destinationStatus] = event.asV1;
        return { from, to, amount, destinationStatus };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesReserveRepatriatedEvent(ctx);
      if (event.isV9000) {
        const [from, to, amount, destinationStatus] = event.asV9000;
        return { from, to, amount, destinationStatus };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesReserveRepatriatedEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error(
        'getBalancesReserveRepatriatedEvent::network not supported'
      );
    }
  }
}

export function getBalancesSlashedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesSlashedEvent(ctx);

      if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesSlashedEvent(ctx);
      if (event.isV9000) {
        const [who, amount] = event.asV9000;
        return { who, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesSlashedEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesSlashedEvent::network not supported');
    }
  }
}

export function getBalancesTransferEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesTransferEvent(ctx);

      if (event.isV1) {
        const [from, to, amount] = event.asV1;
        return { from, to, amount };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesTransferEvent(ctx);
      if (event.isV9000) {
        const [from, to, amount] = event.asV9000;
        return { from, to, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesTransferEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesTransferEvent::network not supported');
    }
  }
}

export function getBalancesUnreservedEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesUnreservedEvent(ctx);

      if (event.isV1) {
        const [who, amount] = event.asV1;
        return { who, amount };
      } else if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesUnreservedEvent(ctx);
      if (event.isV9000) {
        const [who, amount] = event.asV9000;
        return { who, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesUnreservedEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesUnreservedEvent::network not supported');
    }
  }
}

export function getBalancesWithdrawEvent(
  ctx: EventHandlerContext,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.phala: {
      const event = new KhalaBalancesWithdrawEvent(ctx);

      if (event.isV1090) {
        return event.asV1090;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.litentry: {
      const event = new LitentryBalancesWithdrawEvent(ctx);
      if (event.isV9000) {
        const [who, amount] = event.asV9000;
        return { who, amount };
      }

      if (event.isV9071) {
        return event.asV9071;
      }

      return event.asLatest;
    }

    case SubstrateNetwork.litmus: {
      const event = new LitmusBalancesWithdrawEvent(ctx);

      if (event.isV9020) {
        return event.asV9020;
      }
      return event.asLatest;
    }

    default: {
      throw new Error('getBalancesWithdrawEvent::network not supported');
    }
  }
}
