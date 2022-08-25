import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { getDemocracyTabledEvent } from './typeGetters/getDemocracyTabledEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyTabledEvent(ctx, network);

    const proposal =
      await substrateDemocracyProposalRepository.getByProposalIndex(
        ctx.store,
        network,
        event.proposalIndex
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    proposal.tabledAtBlock = blockNumber;
    proposal.status = SubstrateDemocracyProposalStatus.tabled;
    proposal.updatedAt = date;

    await ctx.store.save(proposal);
  };
