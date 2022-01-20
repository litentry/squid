import * as ss58 from '@subsquid/ss58';
import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
  SubstrateProcessor,
} from '@subsquid/substrate-processor';
import BigNumber from 'bignumber.js';
import { KhalaAccount, KhalaTransfer, KhalaVote } from './model';
import { DemocracyVoteCall } from './types/calls';
import { BalancesTransferEvent } from './types/events';
import * as v1090 from './types/v1090';
import { getOrCreate } from './utils/store';

const registry = ss58.registry.get('phala');
const addressCodec = ss58.codec(registry.prefix);
const decimals = registry.decimals[0];

const processor = new SubstrateProcessor('litentry_squid_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(500);
processor.setDataSource({
  archive: 'https://khala.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});

processor.addExtrinsicHandler('democracy.vote', async (ctx) => {
  const blockNumber = BigInt(ctx.block.height);
  const date = new Date(ctx.block.timestamp);

  const account = await getOrCreate(
    ctx.store,
    KhalaAccount,
    ctx.extrinsic.signer
  );
  account.totalVotes = (account.totalVotes || 0) + 1;

  await ctx.store.save(account);

  const vote = new KhalaVote({
    id: `${blockNumber.toString()}-${ctx.extrinsic.indexInBlock}`,
    blockNumber,
    date,
    account,
  });

  await ctx.store.save(vote);

  // getVoteExtrinsic(ctx);
});

processor.addEventHandler('balances.Transfer', async (ctx) => {
  const blockNumber = BigInt(ctx.event.blockNumber);
  const timestamp = new Date(ctx.event.blockTimestamp);
  const transfer = getTransferEvent(ctx);
  const from = addressCodec.encode(transfer.from);
  const to = addressCodec.encode(transfer.to);
  const amount = transfer.amount;

  // sender
  const accountFrom = await getOrCreate(ctx.store, KhalaAccount, from);

  accountFrom.lastTransferOutBlockNumber = blockNumber;
  accountFrom.lastTransferOutDate = timestamp;

  if (!accountFrom.firstTransferOutBlockNumber) {
    accountFrom.firstTransferOutBlockNumber = blockNumber;
    accountFrom.firstTransferOutDate = timestamp;
  }

  await ctx.store.save(accountFrom);

  // receiver
  const accountTo = await getOrCreate(ctx.store, KhalaAccount, to);

  accountTo.lastTransferInBlockNumber = blockNumber;
  accountTo.lastTransferInDate = timestamp;

  if (!accountTo.firstTransferInBlockNumber) {
    accountTo.firstTransferInBlockNumber = blockNumber;
    accountTo.firstTransferInDate = timestamp;
  }

  await ctx.store.save(accountTo);

  // transfer
  const transferModel = new KhalaTransfer({
    id: `${blockNumber.toString()}-${ctx.event.indexInBlock}`,
  });
  transferModel.blockNumber = blockNumber;
  transferModel.date = new Date(timestamp);
  transferModel.to = accountTo;
  transferModel.from = accountFrom;
  transferModel.amount = new BigNumber(amount.toString())
    .shiftedBy(decimals)
    .toNumber();

  await ctx.store.save(transferModel);
});

processor.run();

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
    return event.asLatest;
  }
}

interface VoteCall {
  refIndex: number;
  vote: v1090.AccountVote;
}

function getVoteExtrinsic(ctx: ExtrinsicHandlerContext): VoteCall {
  const extrinsic = new DemocracyVoteCall(ctx);
  if (extrinsic.isV1) {
    const { refIndex, vote } = extrinsic.asV1;
    // switch is required to convince the compiler in correct type
    switch (vote.__kind) {
      case 'Standard':
        return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
      case 'Split':
        return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
    }
  } else {
    return extrinsic.asLatest;
  }
}
