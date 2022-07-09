import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyReferendaStatus, SubstrateNetwork } from '../model';
import { getDemocracyCancelledEvent } from './typeGetters/getDemocracyCancelledEvent';
import substrateDemocracyReferendaRepository from '../repositories/substrateDemocracyReferendaRepository';


export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const date = new Date(ctx.block.timestamp);
    const event = getDemocracyCancelledEvent(ctx, network);

    const referenda = await substrateDemocracyReferendaRepository.getByReferendaIndex(ctx, network, event.refIndex);

    if (!referenda) {
      throw new Error(`Referenda not found`);
    }

    referenda.status = SubstrateDemocracyReferendaStatus.cancelled;
    referenda.updatedAt = date;

    await ctx.store.save(referenda);
  };

