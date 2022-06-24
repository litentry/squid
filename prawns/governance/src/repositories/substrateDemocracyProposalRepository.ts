import {SubstrateDemocracyProposal } from '../model';
import {EventHandlerContext} from "@subsquid/substrate-processor";

const getByProposalIndex = async (ctx: EventHandlerContext, proposalIndex: number) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { proposalIndex },
  }) as unknown as (SubstrateDemocracyProposal | undefined);
}

export default {
  getByProposalIndex
}