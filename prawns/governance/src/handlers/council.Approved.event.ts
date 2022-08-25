import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import substrateCouncilProposalRepository from '../repositories/substrateCouncilProposalRepository';
import { getCouncilApprovedEvent } from './typeGetters/getCouncilApprovedEvent';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    const event = getCouncilApprovedEvent(ctx, network);
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
    councilProposal.status = 'approved';
    councilProposal.lastUpdate = date;
    await ctx.store.save(councilProposal);
  };
