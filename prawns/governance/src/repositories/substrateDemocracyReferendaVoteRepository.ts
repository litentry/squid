import {
  SubstrateDemocracyReferendaVote,
  SubstrateDemocracyReferenda,
  SubstrateGovernanceAccount,
  SubstrateNetwork,
} from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';

const getLastVoteByReferendaAndAccount = async (
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  democracyReferenda: SubstrateDemocracyReferenda,
  account: SubstrateGovernanceAccount
) => {
  return ctx.store.findOne(SubstrateDemocracyReferendaVote, {
    where: { network, account, democracyReferenda },
    order: { blockNumber: 'DESC' },
  }) as unknown as SubstrateDemocracyReferendaVote | undefined;
};

export default {
  getLastVoteByReferendaAndAccount,
};
