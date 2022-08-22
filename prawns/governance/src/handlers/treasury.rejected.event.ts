import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateNetwork, SubstrateTreasuryProposalStatus } from '../model';
import substrateTreasuryProposalRepository from '../repositories/substrateTreasuryProposalRepository';
import { getTreasuryRejectedEvent } from './typeGetters/getTreasuryRejectedEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    const event = getTreasuryRejectedEvent(ctx, network);

    const proposal =
      await substrateTreasuryProposalRepository.getByProposalIndex(
        ctx.store,
        network,
        event.proposalIndex
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    proposal.status = SubstrateTreasuryProposalStatus.rejected;

    await ctx.store.save(proposal);
  };
