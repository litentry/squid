import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateBalanceChangeEventType, SubstrateNetwork } from '../model';
import handleBalanceChange from './handleBalanceChange';
import { getBalancesTransferEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext<Store>) => {
    const { from, to, amount } = getBalancesTransferEvent(ctx, network);
    await handleBalanceChange({
      type: SubstrateBalanceChangeEventType.BalancesTransfer,
      network,
      ctx,
      tokenIndex,
      account: to,
      amount: amount,
      from,
    });
  };
};
