import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const proposedProposals =
      await substrateDemocracyProposalRepository.findByStatus(
        ctx,
        network,
        'proposed'
      );
    await Promise.all(
      proposedProposals.map((proposal) => {
        proposal.status = SubstrateDemocracyProposalStatus.cancelled;
        return ctx.store.save(proposal);
      })
    );
  };
