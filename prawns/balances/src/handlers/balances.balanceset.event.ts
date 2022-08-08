import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateBalanceChangeEventType, SubstrateNetwork } from '../model';
import handleBalanceChange from './handleBalanceChange';
import { getBalancesBalanceSetEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext<Store>) => {
    const { who, free, reserved } = getBalancesBalanceSetEvent(ctx, network);
    await handleBalanceChange({
      type: SubstrateBalanceChangeEventType.BalancesBalanceSet,
      network,
      ctx,
      tokenIndex,
      account: who,
      amount: free + reserved,
    });
  };
};
