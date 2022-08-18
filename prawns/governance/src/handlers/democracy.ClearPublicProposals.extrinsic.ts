import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { Store } from '@subsquid/typeorm-store';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const proposedProposals =
      await substrateDemocracyProposalRepository.findByStatus(
        ctx.store,
        network,
        SubstrateDemocracyProposalStatus.proposed
      );
    await Promise.all(
      proposedProposals.map((proposal) => {
        proposal.status = SubstrateDemocracyProposalStatus.cancelled;
        return ctx.store.save(proposal);
      })
    );
  };
