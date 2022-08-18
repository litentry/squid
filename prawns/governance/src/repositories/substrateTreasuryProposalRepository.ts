import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateNetwork, SubstrateTreasuryProposal } from '../model';

const getByProposalIndex = async (
  store: Store,
  network: SubstrateNetwork,
  proposalIndex: number
) => {
  return store.get(SubstrateTreasuryProposal, {
    where: { id: `${network}:${proposalIndex}` },
    relations: { account: true },
  }) as unknown as SubstrateTreasuryProposal | undefined;
};

export default {
  getByProposalIndex,
};
