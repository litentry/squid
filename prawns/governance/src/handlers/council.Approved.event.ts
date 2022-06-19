import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import substrateCouncilProposalRepository from "../repositories/substrateCouncilProposalRepository";
import {getCouncilApprovedEvent} from "./typeGetters/getCouncilApprovedEvent";

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    const event = getCouncilApprovedEvent(ctx, network);
    const date = new Date(ctx.block.timestamp);
    const councilProposal = await substrateCouncilProposalRepository.getByProposalHash(ctx, event.proposalHash);
      if (!councilProposal) {
          throw new Error(`Proposal not found`);
      }
    councilProposal.status = 'approved';
    councilProposal.lastUpdate = date;
    await ctx.store.save(councilProposal);
  };

