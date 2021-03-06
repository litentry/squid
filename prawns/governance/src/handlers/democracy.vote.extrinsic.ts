import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import {
  SubstrateDemocracyReferendaVote,
  SubstrateNetwork,
  SubstrateProposalVote,
} from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import {
  AccountVote,
  getDemocracyVoteCall,
} from './typeGetters/getDemocracyVoteCall';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';
import substrateDemocracyReferendaVoteRepository from '../repositories/substrateDemocracyReferendaVoteRepository';

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
    account.totalDemocracyReferendaVotes =
      account.totalDemocracyReferendaVotes + 1;
    await ctx.store.save(account);

    const referenda =
      await substrateDemocracyReferendaRepository.getByReferendaIndex(
        ctx,
        network,
        call.refIndex
      );

    if (!referenda) {
      throw new Error(`Referenda not found`);
    }

    const deprecatedVote = new SubstrateProposalVote({
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

    const voteBalance = {
      aye: BigInt(0),
      nay: BigInt(0),
    };

    if (call.vote.__kind === 'Standard') {
      const multiple = (call.vote.vote % 128) * 10 || 1;
      voteBalance[call.vote.vote >= 128 ? 'aye' : 'nay'] =
        (call.vote.balance / 10n) * BigInt(multiple);
    } else {
      voteBalance.aye = call.vote.aye;
      voteBalance.nay = call.vote.nay;
    }

    const vote = new SubstrateDemocracyReferendaVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      democracyReferenda: referenda,
      ...voteBalance,
    });

    // If the same user voted previously then their previous vote is discounted
    const lastVote =
      await substrateDemocracyReferendaVoteRepository.getLastVoteByReferendaAndAccount(
        ctx,
        network,
        referenda,
        account
      );

    if (lastVote) {
      referenda.aye -= lastVote.aye;
      referenda.nay -= lastVote.nay;
    }

    referenda.aye += voteBalance.aye;
    referenda.nay += voteBalance.nay;

    await Promise.all([
      ctx.store.save(deprecatedVote),
      ctx.store.save(vote),
      ctx.store.save(referenda),
    ]);
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
