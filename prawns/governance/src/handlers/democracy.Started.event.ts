import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyReferenda, SubstrateDemocracyReferendaStatus, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { getDemocracyStartedEvent } from './typeGetters/getDemocracyStartedEvent';


export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyStartedEvent(ctx, network);

    const democracyProposal = await substrateDemocracyProposalRepository.getByTabledAtBlock(ctx, network, blockNumber);

    const referenda = new SubstrateDemocracyReferenda({
      id: `${network}:${event.refIndex}`,
      network,
      blockNumber,
      date,
      updatedAt: date,
      voteThreshold: event.thresholdKind,
      status: SubstrateDemocracyReferendaStatus.started,
      democracyProposal: democracyProposal
    });

    await ctx.store.save(referenda);

    if (democracyProposal) {
      democracyProposal.democracyReferenda = referenda;
      await ctx.store.save(democracyProposal);
    }
  };

