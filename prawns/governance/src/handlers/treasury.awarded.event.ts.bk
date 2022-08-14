import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTreasuryProposalStatus } from '../model';
import { getTreasuryAwardedEvent } from './typeGetters/getTreasuryAwardedEvent';
import substrateTreasuryProposalRepository from '../repositories/substrateTreasuryProposalRepository';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    const event = getTreasuryAwardedEvent(ctx, network);

    const proposal =
      await substrateTreasuryProposalRepository.getByProposalIndex(
        ctx,
        network,
        event.proposalIndex
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    proposal.status = SubstrateTreasuryProposalStatus.awarded;

    await ctx.store.save(proposal);
  };
