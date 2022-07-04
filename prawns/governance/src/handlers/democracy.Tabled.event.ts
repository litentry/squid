import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import { getDemocracyTabledEvent } from './typeGetters/getDemocracyTabledEvent';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';


export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyTabledEvent(ctx, network);

    const proposal = await substrateDemocracyProposalRepository.getByProposalIndex(ctx, network, event.proposalIndex);

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    proposal.tabledAtBlock = blockNumber;
    proposal.status = 'tabled';
    proposal.updatedAt = date;

    await ctx.store.save(proposal);
  };

