import { Store } from '@subsquid/typeorm-store';
import {
  SubstrateDemocracyReferenda,
  SubstrateDemocracyReferendaVote,
  SubstrateGovernanceAccount,
  SubstrateNetwork,
} from '../model';

const getLastVoteByReferendaAndAccount = async (
  store: Store,
  network: SubstrateNetwork,
  democracyReferenda: SubstrateDemocracyReferenda,
  account: SubstrateGovernanceAccount
) => {
  return store.findOne(SubstrateDemocracyReferendaVote, {
    where: {
      network,
      account: { id: account.id },
      democracyReferenda: { id: democracyReferenda.id },
    },
    order: { blockNumber: 'DESC' },
  }) as unknown as SubstrateDemocracyReferendaVote | undefined;
};

export default {
  getLastVoteByReferendaAndAccount,
};
