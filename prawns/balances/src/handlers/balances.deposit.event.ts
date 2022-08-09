import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateBalanceChangeEventType, SubstrateNetwork } from '../model';
import handleBalanceChange from './handleBalanceChange';
import { getBalancesDepositEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext<Store>) => {
    const { who, amount } = getBalancesDepositEvent(ctx, network);
    await handleBalanceChange({
      type: SubstrateBalanceChangeEventType.BalancesDeposit,
      network,
      ctx,
      tokenIndex,
      account: who,
      amount,
    });
  };
};
