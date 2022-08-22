import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import subsquare from '../clients/subsquare';
import {
  SubstrateDemocracyReferenda,
  SubstrateDemocracyReferendaStatus,
  SubstrateNetwork,
} from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { getDemocracyStartedEvent } from './typeGetters/getDemocracyStartedEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyStartedEvent(ctx, network);

    const democracyProposal =
      await substrateDemocracyProposalRepository.getByTabledAtBlock(
        ctx.store,
        network,
        blockNumber
      );

    const subsquareReferenda = await subsquare.getDemocracyReferenda(
      network,
      event.refIndex
    );

    const referenda = new SubstrateDemocracyReferenda({
      id: `${network}:${event.refIndex}`,
      network,
      blockNumber,
      date,
      title: subsquareReferenda.title,
      description: subsquareReferenda.content,
      updatedAt: date,
      voteThreshold: event.thresholdKind,
      status: SubstrateDemocracyReferendaStatus.started,
      democracyProposal: democracyProposal,
      aye: BigInt(0),
      nay: BigInt(0),
    });

    await ctx.store.save(referenda);

    if (democracyProposal) {
      democracyProposal.democracyReferenda = referenda;
      await ctx.store.save(democracyProposal);
    }
  };
