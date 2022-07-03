import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateCouncilVote } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getCouncilVoteCall } from './typeGetters/getCouncilVoteCall';
import substrateCouncilProposalRepository from "../repositories/substrateCouncilProposalRepository";

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    const call = getCouncilVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalProposalVotes = account.totalProposalVotes + 1;
    await ctx.store.save(account);

    const councilProposal = await substrateCouncilProposalRepository.getByProposalHash(ctx, network, call.proposal);

    if (!councilProposal) {
      throw new Error(`Proposal not found`);
    }

    const vote = new SubstrateCouncilVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
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
