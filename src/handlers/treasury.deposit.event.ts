import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateAccount,
  SubstrateBalance,
  SubstrateNetwork,
  SubstrateTreasuryDeposit,
} from '../model';
import { getRegistry } from '../utils/registry';
import { getOrCreate, getOrCreateAccount } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';
import { getTreasuryDepositEvent } from './typeGetters/getTreasuryEvents';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const id = ctx.extrinsic?.signer;
    if (!id) return;

    const rootAccount = getAccountHex(id);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const deposit = getTreasuryDepositEvent(ctx, network);
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];
    const prefix = getRegistry(network).prefix;

    const account = await getOrCreateAccount(ctx.store, SubstrateAccount, {
      id,
      rootAccount,
      network,
      prefix,
    });
    await ctx.store.save(account);

    const balanceAccount = await getOrCreate(ctx.store, SubstrateBalance, {
      id: `${id}:${symbol}`,
      network,
      symbol,
      decimals,
      rootAccount,
      account,
    });
    balanceAccount.balance = balanceAccount.balance || 0n;
    balanceAccount.balance -= deposit;

    await ctx.store.save(balanceAccount);

    const depositModel = new SubstrateTreasuryDeposit({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      accountBalanceAtBlock: balanceAccount.balance,
      amount: deposit,
    });

    await ctx.store.save(depositModel);
  };
