import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import substrateCouncilProposalRepository from '../repositories/substrateCouncilProposalRepository';
import { getCouncilClosedEvent } from './typeGetters/getCouncilClosedEvent';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    const event = getCouncilClosedEvent(ctx, network);
    const date = new Date(ctx.block.timestamp);
    const councilProposal =
      await substrateCouncilProposalRepository.getByProposalHash(
        ctx.store,
        network,
        event.proposalHash
      );
    if (!councilProposal) {
      throw new Error(`Proposal not found`);
    }
    councilProposal.status = 'closed';
    councilProposal.lastUpdate = date;
    await ctx.store.save(councilProposal);
  };
