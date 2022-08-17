import { CommonHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyReferenda, SubstrateNetwork } from '../model';

const getByReferendaIndex = async (
  ctx: CommonHandlerContext<Store>,
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
