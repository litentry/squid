import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyReferendaStatus, SubstrateNetwork } from '../model';
import { getDemocracyPassedEvent } from './typeGetters/getDemocracyPassedEvent';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyPassedEvent(ctx, network);

    const referenda =
      await substrateDemocracyReferendaRepository.getByReferendaIndex(
        ctx,
        network,
        event.refIndex
      );

    if (!referenda) {
      throw new Error(`Referenda not found`);
    }

    referenda.status = SubstrateDemocracyReferendaStatus.passed;
    referenda.updatedAt = date;

    await ctx.store.save(referenda);
  };
