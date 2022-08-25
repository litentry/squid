import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import {
  SubstrateDemocracyReferendaVote,
  SubstrateNetwork,
  SubstrateProposalVote,
} from '../model';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';
import substrateDemocracyReferendaVoteRepository from '../repositories/substrateDemocracyReferendaVoteRepository';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import {
  AccountVote,
  getDemocracyVoteCall,
} from './typeGetters/getDemocracyVoteCall';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const accountAddress = getCallOriginAccount(ctx.call.origin, network);
    assert(accountAddress);
    const publicKey = decodeAddress(accountAddress);
    const call = getDemocracyVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: accountAddress,
      publicKey,
      network,
    });
    account.totalProposalVotes = account.totalProposalVotes + 1;
    account.totalDemocracyReferendaVotes =
      account.totalDemocracyReferendaVotes + 1;
    await ctx.store.save(account);

    const referenda =
      await substrateDemocracyReferendaRepository.getByReferendaIndex(
        ctx.store,
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
      publicKey,
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
      publicKey,
      blockNumber,
      date,
      democracyReferenda: referenda,
      ...voteBalance,
    });

    // If the same user voted previously then their previous vote is discounted
    const lastVote =
      await substrateDemocracyReferendaVoteRepository.getLastVoteByReferendaAndAccount(
        ctx.store,
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
