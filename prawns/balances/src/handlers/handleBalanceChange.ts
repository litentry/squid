import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import {
  SubstrateBalanceAccount,
  SubstrateBalanceChangeEvent,
  SubstrateBalanceChangeEventType,
  SubstrateBalanceTransfer,
  SubstrateNetwork,
} from '../model';
import {
  decodeAddress,
  encodeAddress,
  getOrCreate,
  getRegistry,
} from '../utils';

export default async ({
  type,
  network,
  tokenIndex,
  ctx,
  account,
  amount,
  from,
}: {
  type: SubstrateBalanceChangeEventType;
  network: SubstrateNetwork;
  tokenIndex: number;
  ctx: EventHandlerContext<Store>;
  account: Uint8Array;
  amount: bigint;
  from?: Uint8Array;
}) => {
  const blockNumber = BigInt(ctx.block.height);
  const date = new Date(ctx.block.timestamp);
  const symbol = getRegistry(network).symbols[tokenIndex];
  const decimals = getRegistry(network).decimals[tokenIndex];
  const id = encodeAddress(network, account);
  const publicKey = decodeAddress(account);

  let fromAccount: SubstrateBalanceAccount | undefined;

  if (from) {
    fromAccount = await getOrCreate(ctx.store, SubstrateBalanceAccount, {
      id,
      publicKey,
      network,
      symbol,
      decimals,
      firstBalanceChangeEventDate: date,
      firstBalanceChangeEventBlockNumber: blockNumber,
      lastBalanceChangeEventDate: date,
      lastBalanceChangeEventBlockNumber: blockNumber,
      totalTransfers: 0,
      totalBalanceChangeEvents: 0,
    });
  }

  const balanceAccount = await getOrCreate(ctx.store, SubstrateBalanceAccount, {
    id,
    publicKey,
    network,
    symbol,
    decimals,
    firstBalanceChangeEventDate: date,
    firstBalanceChangeEventBlockNumber: blockNumber,
    lastBalanceChangeEventDate: date,
    lastBalanceChangeEventBlockNumber: blockNumber,
    totalTransfers: 0,
    totalBalanceChangeEvents: 0,
  });

  balanceAccount.totalBalanceChangeEvents += 1;

  if (fromAccount) {
    balanceAccount.totalTransfers += 1;
    fromAccount.totalTransfers += 1;
  }

  await ctx.store.save(balanceAccount);

  await ctx.store.save(
    new SubstrateBalanceChangeEvent({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account: balanceAccount,
      type,
      symbol,
      decimals,
      amount,
      blockNumber,
      date,
    })
  );

  if (fromAccount) {
    await ctx.store.save(
      new SubstrateBalanceChangeEvent({
        id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
        network,
        account: fromAccount,
        type,
        symbol,
        decimals,
        amount: -amount,
        blockNumber,
        date,
      })
    );

    await ctx.store.save(
      new SubstrateBalanceTransfer({
        id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
        network,
        from: fromAccount,
        to: balanceAccount,
        symbol,
        decimals,
        amount,
        blockNumber,
        date,
      })
    );
  }
};
