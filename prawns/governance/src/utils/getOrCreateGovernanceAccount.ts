import { Store } from '@subsquid/substrate-processor';
import { getOrCreate } from './store';
import { SubstrateGovernanceAccount, SubstrateNetwork } from '../model';

export async function getOrCreateGovernanceAccount(
  store: Store,
  params: {
    id: string;
    rootAccount: string;
    network: SubstrateNetwork;
  }
): Promise<SubstrateGovernanceAccount> {
  const account = await getOrCreate(store, SubstrateGovernanceAccount, {
    ...params,
    totalElectionVotes: 0,
    totalProposalVotes: 0,
    totalDemocracyProposalSeconds: 0,
    totalProposals: 0, // Deprecated
    totalDemocracyProposals: 0,
    totalCouncilProposals: 0,
    totalTechnicalCommitteeProposals: 0,
    totalBountyProposals: 0,
    totalTreasurySpendProposals: 0,
    electionVotes: [],
    proposalVotes: [],
    democracyProposalSeconds: [],
  });

  return account;
}
