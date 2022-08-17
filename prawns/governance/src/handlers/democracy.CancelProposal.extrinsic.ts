import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { getDemocracyCancelProposalCall } from './typeGetters/getDemocracyCancelProposalCall';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const call = getDemocracyCancelProposalCall(ctx, network);
    const proposal =
      await substrateDemocracyProposalRepository.getByProposalIndex(
        ctx,
        network,
        call.propIndex
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    proposal.status = SubstrateDemocracyProposalStatus.cancelled;
    await ctx.store.save(proposal);
  };
