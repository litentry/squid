import { CallHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateDemocracyProposalSecond } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getDemocracySecondCall } from './typeGetters/getDemocracySecondCall';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const publicKey = decodeAddress(ctx.extrinsic.signer);
    const call = getDemocracySecondCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      publicKey,
      network,
    });
    account.totalDemocracyProposalSeconds =
      account.totalDemocracyProposalSeconds + 1;
    account.totalProposalSeconds = account.totalDemocracyProposalSeconds; // Deprecated
    await ctx.store.save(account);

    const proposal =
      await substrateDemocracyProposalRepository.getByProposalIndex(
        ctx,
        network,
        call.proposal
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    const vote = new SubstrateDemocracyProposalSecond({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      proposal,
      upperBound: call.upperBound,
    });

    await ctx.store.save(vote);
  };
