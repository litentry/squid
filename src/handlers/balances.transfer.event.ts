import { EventHandlerContext } from '@subsquid/substrate-processor';
import { AccountInfo } from '@polkadot/types/interfaces/system';
import { ApiDecoration } from '@polkadot/api/types';
import {
  SubstrateAccount,
  SubstrateBalance,
  SubstrateNetwork,
  SubstrateTransfer,
} from '../model';
import { encodeAddress, getRegistry } from '../utils/registry';
import { getOrCreate, getOrCreateAccount } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';
import getApi from '../utils/getApi';
import { getBalancesTransferEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const blockHash = ctx.block.hash;
    const api = await getApi(network);
    const apiAtBlock = await api.at(blockHash);
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

    fromBalanceAccount.network = network;
    fromBalanceAccount.symbol = symbol;
    fromBalanceAccount.decimals = decimals;
    fromBalanceAccount.rootAccount = rootFromAccount;
    fromBalanceAccount.account = fromAccount;
    fromBalanceAccount.totalTransfers =
      (fromBalanceAccount.totalTransfers || 0) + 1;
    fromBalanceAccount.lastTransferOutBlockNumber = blockNumber;
    fromBalanceAccount.lastTransferOutDate = date;

    if (!fromBalanceAccount.firstTransferOutBlockNumber) {
      fromBalanceAccount.firstTransferOutBlockNumber = blockNumber;
      fromBalanceAccount.firstTransferOutDate = date;
    }

    try {
      // this can fail on old blocks
      // https://github.com/polkadot-js/api/issues/3708
      fromBalanceAccount.balance = await getBalanceAtBlock(
        apiAtBlock,
        fromAddress
      );
    } catch (e) {
      // this is accurate enough, only extremely old inactive accounts
      // have the possibility of being out by dust amounts
      fromBalanceAccount.balance = fromBalanceAccount.balance || 0n;
      fromBalanceAccount.balance -= transfer.amount;
      fromBalanceAccount.balance -= tip;
    }

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

    try {
      // see note above
      toBalanceAccount.balance = await getBalanceAtBlock(
        apiAtBlock,
        fromAddress
      );
    } catch (e) {
      toBalanceAccount.balance = toBalanceAccount.balance || 0n;
      toBalanceAccount.balance += transfer.amount;
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

async function getBalanceAtBlock(
  api: ApiDecoration<'promise'>,
  address: string
): Promise<bigint> {
  const raw = (await api.query.system.account(
    address
  )) as unknown as AccountInfo;

  return BigInt(
    (raw.data.free.toBigInt() + raw.data.reserved.toBigInt()).valueOf()
  );
}
