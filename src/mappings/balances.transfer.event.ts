import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateAccount,
  SubstrateBalance,
  SubstrateNetwork,
  SubstrateRootAccount,
  SubstrateTransfer,
} from '../model';
import { encodeAddress, getRegistry } from '../utils/registry';
import { BalancesTransferEvent } from '../types/khala/events';
import { getOrCreate } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const transfer = getTransferEvent(ctx);
    const amount = transfer.amount;
    const tip = ctx.extrinsic?.tip || 0n;
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];
    const prefix = getRegistry(network).prefix;

    // sender
    const fromAddress = encodeAddress(network, transfer.from);
    const rootFromAccount = await getOrCreate(
      ctx.store,
      SubstrateRootAccount,
      getAccountHex(transfer.from),
      true
    );

    const fromAccount = await getOrCreate(
      ctx.store,
      SubstrateAccount,
      fromAddress
    );
    fromAccount.rootAccount = rootFromAccount;
    fromAccount.network = network;
    fromAccount.prefix = prefix;
    await ctx.store.save(fromAccount);

    const fromBalanceAccount = await getOrCreate(
      ctx.store,
      SubstrateBalance,
      `${fromAddress}:${symbol}`
    );

    fromBalanceAccount.network = network;
    fromBalanceAccount.symbol = symbol;
    fromBalanceAccount.decimals = decimals;
    fromBalanceAccount.rootAccount = rootFromAccount;
    fromBalanceAccount.account = fromAccount;
    fromBalanceAccount.totalTransfers =
      (fromBalanceAccount.totalTransfers || 0) + 1;
    fromBalanceAccount.balance = fromBalanceAccount.balance || 0n;
    fromBalanceAccount.balance -= transfer.amount;
    fromBalanceAccount.balance -= tip;
    fromBalanceAccount.lastTransferOutBlockNumber = blockNumber;
    fromBalanceAccount.lastTransferOutDate = date;

    if (!fromBalanceAccount.firstTransferOutBlockNumber) {
      fromBalanceAccount.firstTransferOutBlockNumber = blockNumber;
      fromBalanceAccount.firstTransferOutDate = date;
    }

    await ctx.store.save(fromBalanceAccount);

    // receiver
    const toAddress = encodeAddress(network, transfer.to);
    const rootToAccount = await getOrCreate(
      ctx.store,
      SubstrateRootAccount,
      getAccountHex(transfer.to),
      true
    );

    const toAccount = await getOrCreate(ctx.store, SubstrateAccount, toAddress);
    toAccount.rootAccount = rootToAccount;
    toAccount.network = network;
    toAccount.prefix = prefix;
    await ctx.store.save(toAccount);

    const toBalanceAccount = await getOrCreate(
      ctx.store,
      SubstrateBalance,
      `${toAddress}:${symbol}`
    );

    toBalanceAccount.network = network;
    toBalanceAccount.symbol = symbol;
    toBalanceAccount.decimals = decimals;
    toBalanceAccount.rootAccount = rootToAccount;
    toBalanceAccount.account = toAccount;
    toBalanceAccount.totalTransfers =
      (toBalanceAccount.totalTransfers || 0) + 1;
    toBalanceAccount.balance = toBalanceAccount.balance || 0n;
    toBalanceAccount.balance += transfer.amount;
    toBalanceAccount.lastTransferInBlockNumber = blockNumber;
    toBalanceAccount.lastTransferInDate = date;

    if (!toBalanceAccount.firstTransferInBlockNumber) {
      toBalanceAccount.firstTransferInBlockNumber = blockNumber;
      toBalanceAccount.firstTransferInDate = date;
    }

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

interface TransferEvent {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
}

function getTransferEvent(ctx: EventHandlerContext): TransferEvent {
  const event = new BalancesTransferEvent(ctx);
  if (event.isV1) {
    const [from, to, amount] = event.asV1;
    return { from, to, amount };
  } else {
    console.log(ctx._chain.getEventHash('balances.Transfer'));
    return event.asLatest;
  }
}
