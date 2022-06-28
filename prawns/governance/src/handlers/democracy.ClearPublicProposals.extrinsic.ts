import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
  console.log('3234');
    const proposedProposals = await substrateDemocracyProposalRepository.findByStatus(ctx, network, 'proposed');
    console.log(proposedProposals);
    console.log(ctx.block.height, 'fooooooo');
    await Promise.all(proposedProposals.map(proposal => {
      proposal.status = 'cancelled';
      return ctx.store.save(proposal);
    }));
  };
