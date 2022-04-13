import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getRegistry, getOrCreate, encodeAddress } from '../utils';
import {
  SubstrateBalanceAccount,
  SubstrateNetwork,
  SubstrateTreasuryAwarded,
} from '../model';
import { getTreasuryAwardedEvent, getTreasuryDepositEvent } from './typeGetters/getTreasuryEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const award = getTreasuryAwardedEvent(ctx, network);
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];

    // receiver
    const toAccount = encodeAddress(network, award.account);
    const rootToAccount = decodeAddress(award.account);

    const balanceAccount = await getOrCreate(
      ctx.store,
      SubstrateBalanceAccount,
      {
        id: `${toAccount}:${symbol}`,
        network,
        symbol,
        decimals,
        rootAccount: rootToAccount,
        account: toAccount,
        balance: 0n,
        totalTransfers: 0,
      }
    );
    balanceAccount.balance += award.award;
    await ctx.store.save(balanceAccount);

    const depositModel = new SubstrateTreasuryAwarded({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      accountBalanceAtBlock: balanceAccount.balance,
      amount: award.award,
      depositor: balanceAccount,
    });
    await ctx.store.save(depositModel);
  };
}