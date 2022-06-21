import {SubstrateCouncilProposal} from "../model";
import {EventHandlerContext} from "@subsquid/substrate-processor";

const getByProposalHash = async (ctx: EventHandlerContext, proposalHashArr: Uint8Array) => {
  const proposalHash = '0x' + Buffer.from(proposalHashArr).toString('hex');
  return ctx.store.get(SubstrateCouncilProposal, {
    where: { proposalHash },
  }) as unknown as (SubstrateCouncilProposal | undefined);
}

export default {
  getByProposalHash
}