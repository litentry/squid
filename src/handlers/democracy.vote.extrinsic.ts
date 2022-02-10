import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
// import { DemocracyVoteCall as KhalaDemocracyVoteCall } from '../types/khala/calls';
import * as v1090 from '../types/khala/v1090';
import { SubstrateAccount, SubstrateNetwork, SubstrateVote } from '../model';
import { getOrCreateAccount } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';
import { getRegistry } from '../utils/registry';

interface VoteCall {
  refIndex: number;
  vote: v1090.AccountVote;
}

// NOTE: this method is incomplete as will not work as is, but leaving it here to save a little time when we need it

// function getVoteExtrinsic(
//   ctx: ExtrinsicHandlerContext,
//   network: SubstrateNetwork
// ): VoteCall {
//   switch (network) {
//     case SubstrateNetwork.phala: {
//       const extrinsic = new KhalaDemocracyVoteCall(ctx);
//       if (extrinsic.isV1) {
//         const { refIndex, vote } = extrinsic.asV1;
//         // switch is required to convince the compiler in correct type
//         switch (vote.__kind) {
//           case 'Standard':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//           case 'Split':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//         }
//       } else if (extrinsic.isV1090) {
//         const { refIndex, vote } = extrinsic.asV1090;
//         // switch is required to convince the compiler in correct type
//         switch (vote.__kind) {
//           case 'Standard':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//           case 'Split':
//             return { refIndex, vote: { __kind: vote.__kind, ...vote.value } };
//         }
//       } else {
//         return extrinsic.asLatest;
//       }
//     }

//     default: {
//       throw new Error('getVoteExtrinsic::network not supported');
//     }
//   }
// }

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const prefix = getRegistry(network).prefix;
    const rootAccount = getAccountHex(ctx.extrinsic.signer);

    const account = await getOrCreateAccount(ctx.store, SubstrateAccount, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
      prefix,
    });
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
