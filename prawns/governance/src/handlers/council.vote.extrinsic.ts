import { CallHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateCouncilVote } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getCouncilVoteCall } from './typeGetters/getCouncilVoteCall';
import substrateCouncilProposalRepository from '../repositories/substrateCouncilProposalRepository';
import { Store } from '@subsquid/typeorm-store';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import assert from 'assert';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const address = getCallOriginAccount(ctx.extrinsic.call.origin, network);
    assert(address);
    const publicKey = decodeAddress(address);
    const call = getCouncilVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: address,
      publicKey,
      network,
    });
    account.totalProposalVotes = account.totalProposalVotes + 1;
    await ctx.store.save(account);

    const councilProposal =
      await substrateCouncilProposalRepository.getByProposalHash(
        ctx.store,
        network,
        call.proposal
      );

    if (!councilProposal) {
      throw new Error(`Proposal not found`);
    }

    const vote = new SubstrateCouncilVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      proposalIndex: call.index,
      proposal: councilProposal,
      approve: call.approve,
    });

    if (call.approve) {
      councilProposal.ayeCount++;
    } else {
      councilProposal.nayCount++;
    }
    councilProposal.lastUpdate = date;

    await Promise.all([ctx.store.save(vote), ctx.store.save(councilProposal)]);
  };
