import { SubstrateCouncilProposal, SubstrateNetwork } from '../model';
import {EventHandlerContext} from "@subsquid/substrate-processor";

const getByProposalHash = async (ctx: EventHandlerContext,  network: SubstrateNetwork, proposalHashArr: Uint8Array) => {
  const proposalHash = '0x' + Buffer.from(proposalHashArr).toString('hex');
  return ctx.store.get(SubstrateCouncilProposal, {
    where: { proposalHash, network },
  }) as unknown as (SubstrateCouncilProposal | undefined);
}

export default {
  getByProposalHash
}