import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getRegistry, getOrCreate, encodeAddress } from '../utils';
import {
  SubstrateBalanceAccount, SubstrateBalanceEndowed, SubstrateBalanceSet,
  SubstrateNetwork,
  SubstrateTreasuryAwarded,
} from '../model';
import {getBalancesBalanceSetEvent, getBalancesEndowedEvent} from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) => {
  return async (ctx: EventHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const { account, freeBalance } = getBalancesEndowedEvent(ctx, network);
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];

    // receiver
    const toAccount = encodeAddress(network, account);
    const rootToAccount = decodeAddress(account);

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
    balanceAccount.balance += freeBalance;
    await ctx.store.save(balanceAccount);

    const depositModel = new SubstrateBalanceEndowed({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      accountBalanceAtBlock: balanceAccount.balance,
      amount: balanceAccount.balance,
      account: balanceAccount,
    });
    await ctx.store.save(depositModel);
  };
}