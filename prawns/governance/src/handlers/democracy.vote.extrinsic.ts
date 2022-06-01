import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateProposalVote } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import {
  AccountVote,
  getDemocracyVoteCall,
} from './typeGetters/getDemocracyVoteCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    const call = getDemocracyVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalProposalVotes = account.totalProposalVotes + 1;
    await ctx.store.save(account);

    const vote = new SubstrateProposalVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      refIndex: call.refIndex,
      // not sure how to interpret so saving raw
      vote: JSON.stringify(cleanBigInts(call.vote)),
    });

    await ctx.store.save(vote);
  };

function cleanBigInts(vote: number | AccountVote) {
  if (typeof vote === 'number') {
    return vote.toString();
  }
  if (vote.__kind === 'Standard') {
    return {
      ...vote,
      balance: vote.balance.toString(),
    };
  }
  return {
    ...vote,
    aye: vote.aye.toString(),
    nay: vote.nay.toString(),
  };
}
