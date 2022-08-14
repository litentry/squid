import { SubstrateNetwork, SubstrateTreasuryProposal } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const getByProposalIndex = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalIndex: number
) => {
  return ctx.store.get(SubstrateTreasuryProposal, {
    where: { id: `${network}:${proposalIndex}` },
  }) as unknown as SubstrateTreasuryProposal | undefined;
};

export default {
  getByProposalIndex,
};
