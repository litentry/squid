import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  decodeAddress,
  encodeAddress,
  getRegistry,
  getOrCreate,
} from '../utils';
import {
  SubstrateBalanceAccount,
  SubstrateNetwork,
  SubstrateBalanceTransfer,
} from '../model';
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

    // sender
    const fromAccount = encodeAddress(network, transfer.from);
    const rootFromAccount = decodeAddress(transfer.from);

    const fromBalanceAccount = await getOrCreate(
      ctx.store,
      SubstrateBalanceAccount,
      {
        id: `${fromAccount}:${symbol}`,
        network,
        symbol,
        decimals,
        rootAccount: rootFromAccount,
        account: fromAccount,
        totalTransfers: 0,
        balance: 0n,
      }
    );

    fromBalanceAccount.balance -= transfer.amount;
    // TODO: if somebody pays tips on other extrinsics we won't capture it unless we split this out and index tips from all extrinsic success events
    fromBalanceAccount.balance -= tip;

    fromBalanceAccount.totalTransfers = fromBalanceAccount.totalTransfers + 1;
    fromBalanceAccount.lastTransferOutBlockNumber = blockNumber;
    fromBalanceAccount.lastTransferOutDate = date;

    if (!fromBalanceAccount.firstTransferOutBlockNumber) {
      fromBalanceAccount.firstTransferOutBlockNumber = blockNumber;
      fromBalanceAccount.firstTransferOutDate = date;
    }

    await ctx.store.save(fromBalanceAccount);

    // receiver
    const toAccount = encodeAddress(network, transfer.to);
    const rootToAccount = decodeAddress(transfer.to);

    const toBalanceAccount = await getOrCreate(
      ctx.store,
      SubstrateBalanceAccount,
      {
        id: `${toAccount}:${symbol}`,
        network,
        symbol,
        decimals,
        rootAccount: rootToAccount,
        account: toAccount,
        totalTransfers: 0,
        balance: 0n,
      }
    );

    toBalanceAccount.balance += transfer.amount;

    toBalanceAccount.totalTransfers = toBalanceAccount.totalTransfers + 1;
    toBalanceAccount.lastTransferInBlockNumber = blockNumber;
    toBalanceAccount.lastTransferInDate = date;

    if (!toBalanceAccount.firstTransferInBlockNumber) {
      toBalanceAccount.firstTransferInBlockNumber = blockNumber;
      toBalanceAccount.firstTransferInDate = date;
    }

    await ctx.store.save(toBalanceAccount);

    const transferModel = new SubstrateBalanceTransfer({
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
