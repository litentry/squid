import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateDemocracyReferenda } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { getDemocracyStartedEvent } from './typeGetters/getDemocracyStartedEvent';
import subsquare from '../clients/subsquare';


export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyStartedEvent(ctx, network);

    const democracyProposal = await substrateDemocracyProposalRepository.getByTabledAtBlock(ctx, blockNumber);

    const subsquareReferenda = await subsquare.getDemocracyReferenda(network, event.refIndex);

    const referenda = new SubstrateDemocracyReferenda({
      id: `${network}:${event.refIndex}`,
      network,
      blockNumber,
      date,
      title: subsquareReferenda.title,
      description: subsquareReferenda.content,
      updatedAt: date,
      voteThreshold: event.thresholdKind,
      status: 'started',
      democracyProposal: democracyProposal
    });

    await ctx.store.save(referenda);

    if (democracyProposal) {
      democracyProposal.democracyReferenda = referenda;
      await ctx.store.save(democracyProposal);
    }
  };

