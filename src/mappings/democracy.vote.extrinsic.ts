import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { DemocracyVoteCall } from '../types/khala/calls';
import * as v1090 from '../types/khala/v1090';
import { SubstrateAccount, SubstrateNetwork, SubstrateVote } from '../model';
import { getOrCreate } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);

    const rootAccount = getAccountHex(ctx.extrinsic.signer);

    const account = await getOrCreate(
      ctx.store,
      SubstrateAccount,
      ctx.extrinsic.signer
    );
    account.rootAccount = rootAccount;
    account.totalVotes = (account.totalVotes || 0) + 1;
    await ctx.store.save(account);

    const vote = new SubstrateVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
    });

    await ctx.store.save(vote);

    // getVoteExtrinsic(ctx);
  };

interface VoteCall {
  refIndex: number;
  vote: v1090.AccountVote;
}

// function getVoteExtrinsic(ctx: ExtrinsicHandlerContext): VoteCall {
//   const extrinsic = new DemocracyVoteCall(ctx);
//   if (extrinsic.isV1) {
//     const { refIndex, vote } = extrinsic.asV1;
//     // switch is required to convince the compiler in correct type
//     switch (vote.__kind) {
//       case 'Standard':
//         return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//       case 'Split':
//         return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//     }
//   } else {
//     return extrinsic.asLatest;
//   }
// }
