import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyReferendaStatus, SubstrateNetwork } from '../model';
import { getDemocracyNotPassedEvent } from './typeGetters/getDemocracyNotPassedEvent';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event) {
      return;
    }

    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyNotPassedEvent(ctx, network);

    const referenda =
      await substrateDemocracyReferendaRepository.getByReferendaIndex(
        ctx.store,
        network,
        event.refIndex
      );

    if (!referenda) {
      throw new Error(`Referenda not found`);
    }

    referenda.status = SubstrateDemocracyReferendaStatus.notPassed;
    referenda.updatedAt = date;

    await ctx.store.save(referenda);
  };
