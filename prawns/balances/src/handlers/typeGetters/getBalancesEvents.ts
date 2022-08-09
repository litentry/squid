import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateNetwork } from '../../model';
import {
  BalancesBalanceSetEvent as KusamaBalancesBalanceSetEvent,
  BalancesDepositEvent as KusamaBalancesDepositEvent,
  BalancesEndowedEvent as KusamaBalancesEndowedEvent,
  BalancesTransferEvent as KusamaBalancesTransferEvent,
} from '../../types/kusama/events';
import {
  BalancesBalanceSetEvent as PolkadotBalancesBalanceSetEvent,
  BalancesDepositEvent as PolkadotBalancesDepositEvent,
  BalancesEndowedEvent as PolkadotBalancesEndowedEvent,
  BalancesTransferEvent as PolkadotBalancesTransferEvent,
} from '../../types/polkadot/events';
// import {
//   BalancesBalanceSetEvent as KhalaBalancesBalanceSetEvent,
//   BalancesDepositEvent as KhalaBalancesDepositEvent,
//   BalancesEndowedEvent as KhalaBalancesEndowedEvent,
//   BalancesTransferEvent as KhalaBalancesTransferEvent,
// } from '../../types/khala/events';
// import {
//   BalancesBalanceSetEvent as LitentryBalancesBalanceSetEvent,
//   BalancesDepositEvent as LitentryBalancesDepositEvent,
//   BalancesEndowedEvent as LitentryBalancesEndowedEvent,
//   BalancesTransferEvent as LitentryBalancesTransferEvent,
// } from '../../types/litentry/events';
// import {
//   BalancesBalanceSetEvent as LitmusBalancesBalanceSetEvent,
//   BalancesDepositEvent as LitmusBalancesDepositEvent,
//   BalancesEndowedEvent as LitmusBalancesEndowedEvent,
//   BalancesTransferEvent as LitmusBalancesTransferEvent,
// } from '../../types/litmus/events';

export function getBalancesBalanceSetEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  free: bigint;
  reserved: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesBalanceSetEvent(ctx);
      if (event.isV1031) {
        const [who, free, reserved] = event.asV1031;
        return { who, free, reserved };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesBalanceSetEvent(ctx);
      if (event.isV0) {
        const [who, free, reserved] = event.asV0;
        return { who, free, reserved };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      throw new Error('Unexpected version');
    }
    // case SubstrateNetwork.phala: {
    //   const event = new KhalaBalancesBalanceSetEvent(ctx);

    //   if (event.isV1) {
    //     const [who, free, reserved] = event.asV1;
    //     return { who, free, reserved };
    //   } else if (event.isV1090) {
    //     return event.asV1090;
    //   } else {
    //     return event.asLatest;
    //   }
    // }

    // case SubstrateNetwork.litentry: {
    //   const event = new LitentryBalancesBalanceSetEvent(ctx);
    //   if (event.isV9000) {
    //     const [who, free, reserved] = event.asV9000;
    //     return { who, free, reserved };
    //   }

    //   if (event.isV9071) {
    //     return event.asV9071;
    //   }

    //   return event.asLatest;
    // }

    // case SubstrateNetwork.litmus: {
    //   const event = new LitmusBalancesBalanceSetEvent(ctx);
    //   if (event.isV9020) {
    //     return event.asV9020;
    //   }

    //   return event.asLatest;
    // }

    default: {
      throw new Error('getBalancesBalanceSetEvent::network not supported');
    }
  }
}

export function getBalancesDepositEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  who: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesDepositEvent(ctx);

      if (event.isV1032) {
        const [who, amount] = event.asV1032;
        return { who, amount };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesDepositEvent(ctx);

      if (event.isV0) {
        const [who, amount] = event.asV0;
        return { who, amount };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      throw new Error('Unexpected version');
    }

    // case SubstrateNetwork.phala: {
    //   const event = new KhalaBalancesDepositEvent(ctx);

    //   if (event.isV1) {
    //     const [who, amount] = event.asV1;
    //     return { who, amount };
    //   } else if (event.isV1090) {
    //     return event.asV1090;
    //   } else {
    //     return event.asLatest;
    //   }
    // }

    // case SubstrateNetwork.litmus: {
    //   const event = new LitmusBalancesDepositEvent(ctx);

    //   if (event.isV9020) {
    //     return event.asV9020;
    //   }
    //   return event.asLatest;
    // }

    // case SubstrateNetwork.litentry: {
    //   const event = new LitentryBalancesDepositEvent(ctx);
    //   if (event.isV9000) {
    //     const [who, amount] = event.asV9000;
    //     return { who, amount };
    //   }

    //   if (event.isV9071) {
    //     return event.asV9071;
    //   }

    //   return event.asLatest;
    // }

    default: {
      throw new Error('getBalancesDepositEvent::network not supported');
    }
  }
}

export function getBalancesEndowedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  account: Uint8Array;
  freeBalance: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesEndowedEvent(ctx);

      if (event.isV1050) {
        const [account, freeBalance] = event.asV1050;
        return { account, freeBalance };
      }

      if (event.isV9130) {
        return event.asV9130;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesEndowedEvent(ctx);

      if (event.isV0) {
        const [account, freeBalance] = event.asV0;
        return { account, freeBalance };
      }

      if (event.isV9140) {
        return event.asV9140;
      }

      throw new Error('Unexpected version');
    }

    // case SubstrateNetwork.phala: {
    //   const event = new KhalaBalancesEndowedEvent(ctx);

    //   if (event.isV1) {
    //     const [account, freeBalance] = event.asV1;
    //     return { account, freeBalance };
    //   } else if (event.isV1090) {
    //     return event.asV1090;
    //   } else {
    //     return event.asLatest;
    //   }
    // }

    // case SubstrateNetwork.litentry: {
    //   const event = new LitentryBalancesEndowedEvent(ctx);
    //   if (event.isV9000) {
    //     const [account, freeBalance] = event.asV9000;
    //     return { account, freeBalance };
    //   }

    //   if (event.isV9071) {
    //     return event.asV9071;
    //   }

    //   return event.asLatest;
    // }

    // case SubstrateNetwork.litmus: {
    //   const event = new LitmusBalancesEndowedEvent(ctx);

    //   if (event.isV9020) {
    //     return event.asV9020;
    //   }
    //   return event.asLatest;
    // }

    default: {
      throw new Error('getBalancesEndowedEvent::network not supported');
    }
  }
}

export function getBalancesTransferEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaBalancesTransferEvent(ctx);

      if (event.isV1020) {
        const [from, to, amount] = event.asV1020;
        return { from, to, amount };
      }

      if (event.isV1050) {
        const [from, to, amount] = event.asV1050;
        return { from, to, amount };
      }

      if (event.isV9130) {
        return event.asV9130;
      }
      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotBalancesTransferEvent(ctx);

      if (event.isV0) {
        const [from, to, amount] = event.asV0;
        return { from, to, amount };
      } else if (event.isV9140) {
        return event.asV9140;
      }
      throw new Error('Unexpected version');
    }

    // case SubstrateNetwork.phala: {
    //   const event = new KhalaBalancesTransferEvent(ctx);

    //   if (event.isV1) {
    //     const [from, to, amount] = event.asV1;
    //     return { from, to, amount };
    //   } else if (event.isV1090) {
    //     return event.asV1090;
    //   } else {
    //     return event.asLatest;
    //   }
    // }

    // case SubstrateNetwork.litentry: {
    //   const event = new LitentryBalancesTransferEvent(ctx);
    //   if (event.isV9000) {
    //     const [from, to, amount] = event.asV9000;
    //     return { from, to, amount };
    //   }

    //   if (event.isV9071) {
    //     return event.asV9071;
    //   }

    //   return event.asLatest;
    // }

    // case SubstrateNetwork.litmus: {
    //   const event = new LitmusBalancesTransferEvent(ctx);

    //   if (event.isV9020) {
    //     return event.asV9020;
    //   }
    //   return event.asLatest;
    // }

    default: {
      throw new Error('getBalancesTransferEvent::network not supported');
    }
  }
}
