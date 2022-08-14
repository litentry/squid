import { SubstrateDemocracyReferenda, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const getByReferendaIndex = async (
  ctx: EventHandlerContext<Store>,
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
