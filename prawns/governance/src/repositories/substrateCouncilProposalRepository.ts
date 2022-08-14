import { SubstrateCouncilProposal, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const getByProposalHash = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalHashArr: Uint8Array
) => {
  const proposalHash = '0x' + Buffer.from(proposalHashArr).toString('hex');
  return ctx.store.findOneBy(SubstrateCouncilProposal, { proposalHash, network }) as unknown as SubstrateCouncilProposal | undefined;
};

export default {
  getByProposalHash,
};
