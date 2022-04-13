import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import {
  BalancesBalanceSetEvent as PolkadotBalancesBalanceSetEvent,
  BalancesDepositEvent as PolkadotBalancesDepositEvent,
  BalancesDustLostEvent as PolkadotBalancesDustLostEvent,
  BalancesEndowedEvent as PolkadotBalancesEndowedEvent,
  BalancesReservedEvent as PolkadotBalancesReservedEvent,
  BalancesReserveRepatriatedEvent as PolkadotBalancesReserveRepatriatedEvent,
  BalancesSlashedEvent as PolkadotBalancesSlashedEvent,
  BalancesTransferEvent as PolkadotBalancesTransferEvent,
  BalancesUnreservedEvent as PolkadotBalancesUnreservedEvent,
  BalancesWithdrawEvent as PolkadotBalancesWithdrawEvent,
  TreasuryAwardedEvent as PolkadotTreasuryAwardedEvent,
} from '../../types/polkadot/events';
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
  TreasuryAwardedEvent as KhalaTreasuryAwardedEvent,
} from '../../types/khala/events';
import {
  BalancesBalanceSetEvent as KusamaBalancesBalanceSetEvent,
  BalancesDepositEvent as KusamaBalancesDepositEvent,
  BalancesDustLostEvent as KusamaBalancesDustLostEvent,
  BalancesEndowedEvent as KusamaBalancesEndowedEvent,
  BalancesReservedEvent as KusamaBalancesReservedEvent,
  BalancesReserveRepatriatedEvent as KusamaBalancesReserveRepatriatedEvent,
  BalancesSlashedEvent as KusamaBalancesSlashedEvent,
  BalancesTransferEvent as KusamaBalancesTransferEvent,
  BalancesUnreservedEvent as KusamaBalancesUnreservedEvent,
  BalancesWithdrawEvent as KusamaBalancesWithdrawEvent,
  TreasuryAwardedEvent as KusamaTreasuryAwardedEvent,
} from '../../types/kusama/events';

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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesBalanceSetEvent(ctx);

      if (event.isV0) {
        const [who, free, reserved] = event.asV0;
        return { who, free, reserved };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesBalanceSetEvent(ctx);

      if (event.isV1031) {
        const [who, free, reserved] = event.asV1031;
        return { who, free, reserved };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesDepositEvent(ctx);

      if (event.isV0) {
        const [who, amount] = event.asV0;
        return { who, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesDepositEvent(ctx);

      if (event.isV1032) {
        const [who, amount] = event.asV1032;
        return { who, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesDustLostEvent(ctx);

      if (event.isV0) {
        const [account, amount] = event.asV0;
        return { account, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesDustLostEvent(ctx);

      if (event.isV1050) {
        const [account, amount] = event.asV1050;
        return { account, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesEndowedEvent(ctx);

      if (event.isV0) {
        const [account, freeBalance] = event.asV0;
        return { account, freeBalance };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesEndowedEvent(ctx);

      if (event.isV1050) {
        const [account, freeBalance] = event.asV1050;
        return { account, freeBalance };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesReservedEvent(ctx);

      if (event.isV8) {
        const [who, amount] = event.asV8;
        return { who, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesReservedEvent(ctx);

      if (event.isV2008) {
        const [who, amount] = event.asV2008;
        return { who, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesReserveRepatriatedEvent(ctx);

      if (event.isV8) {
        const [from, to, amount, destinationStatus] = event.asV8;
        return { from, to, amount, destinationStatus };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesReserveRepatriatedEvent(ctx);

      if (event.isV2008) {
        const [from, to, amount, destinationStatus] = event.asV2008;
        return { from, to, amount, destinationStatus };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesSlashedEvent(ctx);

      if (event.isV9122) {
        const [who, amount] = event.asV9122;
        return { who, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesSlashedEvent(ctx);

      if (event.isV9122) {
        const [who, amount] = event.asV9122;
        return { who, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesTransferEvent(ctx);

      if (event.isV0) {
        const [from, to, amount] = event.asV0;
        return { from, to, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesTransferEvent(ctx);

      if (event.isV1020) {
        const [from, to, amount] = event.asV1020;
        return { from, to, amount };
      } else if (event.isV1050) {
        const [from, to, amount] = event.asV1050;
        return { from, to, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesUnreservedEvent(ctx);

      if (event.isV8) {
        const [who, amount] = event.asV8;
        return { who, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesUnreservedEvent(ctx);

      if (event.isV2008) {
        const [who, amount] = event.asV2008;
        return { who, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
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

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesWithdrawEvent(ctx);

      if (event.isV9122) {
        const [who, amount] = event.asV9122;
        return { who, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesWithdrawEvent(ctx);

      if (event.isV9122) {
        const [who, amount] = event.asV9122;
        return { who, amount };
      } else if (event.isV9130) {
        return event.asV9130;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getBalancesWithdrawEvent::network not supported');
    }
  }
}

