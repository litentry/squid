import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateAccount,
  SubstrateBalance,
  SubstrateNetwork,
  SubstrateTransfer,
} from '../model';
import { encodeAddress, getRegistry } from '../utils/registry';
import { getOrCreate, getOrCreateAccount } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';
import { getBalancesTransferEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const transfer = getBalancesTransferEvent(ctx, network);
    const amount = transfer.amount;
    const tip = ctx.extrinsic?.tip || 0n;
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];
    const prefix = getRegistry(network).prefix;

    // sender
    const fromAddress = encodeAddress(network, transfer.from);
    const rootFromAccount = getAccountHex(transfer.from);

    const fromAccount = await getOrCreateAccount(ctx.store, SubstrateAccount, {
      id: fromAddress,
      rootAccount: rootFromAccount,
      network,
      prefix,
    });
    await ctx.store.save(fromAccount);

    const fromBalanceAccount = await getOrCreate(ctx.store, SubstrateBalance, {
      id: `${fromAddress}:${symbol}`,
      network,
      symbol,
      decimals,
      rootAccount: rootFromAccount,
      account: fromAccount,
    });

    fromBalanceAccount.totalTransfers =
      (fromBalanceAccount.totalTransfers || 0) + 1;
    fromBalanceAccount.lastTransferOutBlockNumber = blockNumber;
    fromBalanceAccount.lastTransferOutDate = date;

    if (!fromBalanceAccount.firstTransferOutBlockNumber) {
      fromBalanceAccount.firstTransferOutBlockNumber = blockNumber;
      fromBalanceAccount.firstTransferOutDate = date;
    }

    fromBalanceAccount.balance = fromBalanceAccount.balance || 0n;
    fromBalanceAccount.balance -= transfer.amount;
    fromBalanceAccount.balance -= tip;

    await ctx.store.save(fromBalanceAccount);

    // receiver
    const toAddress = encodeAddress(network, transfer.to);
    const rootToAccount = getAccountHex(transfer.to);

    const toAccount = await getOrCreateAccount(ctx.store, SubstrateAccount, {
      id: toAddress,
      rootAccount: rootToAccount,
      network,
      prefix,
    });
    await ctx.store.save(toAccount);

    const toBalanceAccount = await getOrCreate(ctx.store, SubstrateBalance, {
      id: `${toAddress}:${symbol}`,
      network,
      symbol,
      decimals,
      rootAccount: rootToAccount,
      account: toAccount,
    });

    toBalanceAccount.totalTransfers =
      (toBalanceAccount.totalTransfers || 0) + 1;
    toBalanceAccount.lastTransferInBlockNumber = blockNumber;
    toBalanceAccount.lastTransferInDate = date;

    if (!toBalanceAccount.firstTransferInBlockNumber) {
      toBalanceAccount.firstTransferInBlockNumber = blockNumber;
      toBalanceAccount.firstTransferInDate = date;
    }

    toBalanceAccount.balance = toBalanceAccount.balance || 0n;
    toBalanceAccount.balance += transfer.amount;

    await ctx.store.save(toBalanceAccount);

    const transferModel = new SubstrateTransfer({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      fromAccountBalanceAtBlock: fromBalanceAccount.balance,
      toAccountBalanceAtBlock: toBalanceAccount.balance,
      to: toBalanceAccount,
      from: fromBalanceAccount,
      amount,
      tip,
    });

    await ctx.store.save(transferModel);
  };
