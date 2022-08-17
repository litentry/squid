import { CommonHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyReferenda, SubstrateNetwork } from '../model';

const getByReferendaIndex = async (
  store: Store,
  network: SubstrateNetwork,
  referendaIndex: number
) => {
  return store.findOne(SubstrateDemocracyReferenda, {
    where: { id: `${network}:${referendaIndex}` },
    relations: { democracyProposal: true }
  }) as unknown as SubstrateDemocracyReferenda | undefined;
};

export default {
  getByReferendaIndex,
};
