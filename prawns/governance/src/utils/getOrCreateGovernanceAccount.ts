import { getOrCreate } from './store';
import { SubstrateGovernanceAccount, SubstrateNetwork } from '../model';
import { Store } from '@subsquid/typeorm-store';

export async function getOrCreateGovernanceAccount(
  store: Store,
  params: {
    id: string;
    publicKey: string;
    network: SubstrateNetwork;
  }
): Promise<SubstrateGovernanceAccount> {
  return getOrCreate(store, SubstrateGovernanceAccount, {
    ...params,
    totalElectionVotes: 0,
    totalProposalVotes: 0, // Deprecated
    totalDemocracyReferendaVotes: 0,
    totalDemocracyProposalSeconds: 0,
    totalProposalSeconds: 0, // Deprecated
    totalDemocracyProposals: 0,
    totalCouncilProposals: 0,
    totalTechnicalCommitteeProposals: 0,
    totalBountyProposals: 0,
    totalTreasurySpendProposals: 0,
    electionVotes: [],
    proposalVotes: [],
    democracyReferendaVotes: [],
    democracyProposalSeconds: [],
  });
}
