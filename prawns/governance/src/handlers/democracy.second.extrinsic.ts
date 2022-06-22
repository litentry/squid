import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateDemocracyProposalSecond } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getDemocracySecondCall } from './typeGetters/getDemocracySecondCall';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    const call = getDemocracySecondCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalDemocracyProposalSeconds = account.totalDemocracyProposalSeconds + 1;
    await ctx.store.save(account);

    const proposal = await substrateDemocracyProposalRepository.getByProposalIndex(ctx, call.proposal);

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    const vote = new SubstrateDemocracyProposalSecond({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposal,
      upperBound: call.upperBound,
    });

    await ctx.store.save(vote);
  };
