import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateBalanceChangeEventType, SubstrateNetwork } from '../model';
import handleBalanceChange from './handleBalanceChange';
import { getBalancesEndowedEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext<Store>) => {
    const { account, freeBalance } = getBalancesEndowedEvent(ctx, network);
    await handleBalanceChange({
      type: SubstrateBalanceChangeEventType.BalancesEndowed,
      network,
      ctx,
      tokenIndex,
      account,
      amount: freeBalance,
    });
  };
};
