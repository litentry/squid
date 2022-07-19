import { SubstrateDemocracyReferenda, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';

const getByReferendaIndex = async (
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  referendaIndex: number
) => {
  return ctx.store.get(SubstrateDemocracyReferenda, {
    where: { id: `${network}:${referendaIndex}` },
  }) as unknown as SubstrateDemocracyReferenda | undefined;
};

export default {
  getByReferendaIndex,
};
