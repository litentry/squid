import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateDemocracyReferendaVote, SubstrateNetwork, SubstrateProposalVote } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import {
  AccountVote,
  getDemocracyVoteCall,
} from './typeGetters/getDemocracyVoteCall';
import substrateCouncilProposalRepository from '../repositories/substrateCouncilProposalRepository';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';

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
    account.totalDemocracyReferendaVotes = account.totalDemocracyReferendaVotes + 1;
    await ctx.store.save(account);

    const referenda = await substrateDemocracyReferendaRepository.getByReferendaIndex(ctx, network, call.refIndex);

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

    const voteWeight = {
      ayeWeight: BigInt(0),
      nayWeight: BigInt(0)
    };

    if (call.vote.__kind === 'Standard') {
      const multiple = (call.vote.vote % 128) * 10 || 1;
      voteWeight[call.vote.vote >= 128 ? 'ayeWeight' : 'nayWeight'] = call.vote.balance / 10n * BigInt(multiple);
      console.log(`${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}, ${multiple / 10}, ${call.vote.balance}, aye: ${call.vote.vote >= 128}, weight: ${call.vote.balance / 10n * BigInt(multiple)}`)
    } else {
      voteWeight.ayeWeight = call.vote.aye;
      voteWeight.nayWeight = call.vote.nay;
    }

    const vote = new SubstrateDemocracyReferendaVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      democracyReferenda: referenda,
      ...voteWeight
    });

    referenda.aye += voteWeight.ayeWeight;
    referenda.nay += voteWeight.nayWeight;

    await Promise.all([ctx.store.save(deprecatedVote), ctx.store.save(vote), ctx.store.save(referenda)])
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
