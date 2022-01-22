import * as ss58 from '@subsquid/ss58';
import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
  SubstrateProcessor,
} from '@subsquid/substrate-processor';
import { KhalaAccount, KhalaTransfer, KhalaVote } from './model';
import { DemocracyVoteCall } from './types/calls';
import { BalancesTransferEvent } from './types/events';
import * as v1090 from './types/v1090';
import { getOrCreate } from './utils/store';

const registry = ss58.registry.get('phala');
const addressCodec = ss58.codec(registry.prefix);

const processor = new SubstrateProcessor('litentry_squid_khala');

processor.setTypesBundle('typeDefs.json');
// processor.setTypesBundle('khala'); # todo, get this working
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
  const date = new Date(ctx.event.blockTimestamp);
  const transfer = getTransferEvent(ctx);
  const fromAddress = addressCodec.encode(transfer.from);
  const toAddress = addressCodec.encode(transfer.to);
  const amount = transfer.amount;
  const tip = ctx.extrinsic?.tip || 0n;

  // sender
  const from = await getOrCreate(ctx.store, KhalaAccount, fromAddress);
  from.balance = from.balance || 0n;
  from.balance -= transfer.amount;
  from.balance -= tip;

  from.lastTransferOutBlockNumber = blockNumber;
  from.lastTransferOutDate = date;

  if (!from.firstTransferOutBlockNumber) {
    from.firstTransferOutBlockNumber = blockNumber;
    from.firstTransferOutDate = date;
  }

  await ctx.store.save(from);

  // receiver
  const to = await getOrCreate(ctx.store, KhalaAccount, toAddress);

  to.balance = to.balance || 0n;
  to.balance += transfer.amount;

  to.lastTransferInBlockNumber = blockNumber;
  to.lastTransferInDate = date;

  if (!to.firstTransferInBlockNumber) {
    to.firstTransferInBlockNumber = blockNumber;
    to.firstTransferInDate = date;
  }

  await ctx.store.save(to);

  // transfer
  const transferModel = new KhalaTransfer({
    id: `${blockNumber.toString()}-${ctx.event.indexInBlock}`,
    blockNumber,
    date,
    to,
    from,
    amount,
    tip,
  });

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
