import * as ss58 from '@subsquid/ss58';
import {
  SubstrateProcessor,
  EventHandlerContext,
} from '@subsquid/substrate-processor';
import BigNumber from 'bignumber.js';
import { getOrCreate } from './utils/store';
import getApi from './utils/getApi';
import { KhalaAccount, KhalaTransfer } from './model';
import { BalancesTransferEvent } from './types/events';

const processor = new SubstrateProcessor('khala_identity');

processor.setTypesBundle('typeDefs.json');
processor.setBatchSize(500);

processor.setDataSource({
  archive: 'https://khala.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});

processor.addEventHandler('balances.Transfer', async (ctx) => {
  const api = await getApi();
  const blockNumber = BigInt(ctx.event.blockNumber);
  const timestamp = new Date(ctx.event.blockTimestamp);
  const transfer = getTransferEvent(ctx);
  // const from = transfer.from.toString();
  // const to = transfer.to.toString();
  const from = ss58.codec('phala').encode(transfer.from);
  const to = ss58.codec('phala').encode(transfer.to);
  const amount = transfer.amount;

  // sender
  const accountFrom = await getOrCreate<KhalaAccount>(
    ctx.store,
    KhalaAccount,
    from
  );

  accountFrom.lastTransferOutBlockNumber = blockNumber;
  accountFrom.lastTransferOutDate = timestamp;

  if (!accountFrom.firstTransferOutBlockNumber) {
    accountFrom.firstTransferOutBlockNumber = blockNumber;
    accountFrom.firstTransferOutDate = timestamp;
  }

  await ctx.store.save<KhalaAccount>(accountFrom);

  // receiver
  const accountTo = await getOrCreate<KhalaAccount>(
    ctx.store,
    KhalaAccount,
    to
  );

  accountTo.lastTransferInBlockNumber = blockNumber;
  accountTo.lastTransferInDate = timestamp;

  if (!accountTo.firstTransferInBlockNumber) {
    accountTo.firstTransferInBlockNumber = blockNumber;
    accountTo.firstTransferInDate = timestamp;
  }

  await ctx.store.save<KhalaAccount>(accountTo);

  // transfer
  const transferModel = new KhalaTransfer();
  transferModel.blockNumber = blockNumber;
  transferModel.date = new Date(timestamp);
  transferModel.to = accountTo;
  transferModel.from = accountFrom;
  transferModel.amount = new BigNumber(amount.toString())
    .shiftedBy(-api.registry.chainDecimals[0])
    .toNumber();

  await ctx.store.save<KhalaTransfer>(transferModel);
});

processor.run();

interface TransferEvent {
  from: Uint8Array;
  to: Uint8Array;
  amount: bigint;
}

function getTransferEvent(ctx: EventHandlerContext): TransferEvent {
  let event = new BalancesTransferEvent(ctx);
  if (event.isV1) {
    let [from, to, amount] = event.asV1;
    return { from, to, amount };
  } else {
    return event.asLatest;
  }
}
