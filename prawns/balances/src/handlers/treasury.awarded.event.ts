import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateBalanceChangeEventType, SubstrateNetwork } from '../model';
import handleBalanceChange from './handleBalanceChange';
import { getTreasuryAwardedEvent } from './typeGetters/getTreasuryEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext<Store>) => {
    const { award, account } = getTreasuryAwardedEvent(ctx, network);
    await handleBalanceChange({
      type: SubstrateBalanceChangeEventType.TreasuryAwarded,
      network,
      ctx,
      tokenIndex,
      account,
      amount: award,
    });
  };
};
