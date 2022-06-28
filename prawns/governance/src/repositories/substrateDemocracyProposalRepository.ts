import { SubstrateDemocracyProposal, SubstrateNetwork } from '../model';
import {EventHandlerContext} from "@subsquid/substrate-processor";

const getByProposalIndex = async (ctx: EventHandlerContext, proposalIndex: number) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { proposalIndex },
  }) as unknown as (SubstrateDemocracyProposal | undefined);
}

const getByTabledAtBlock = async (ctx: EventHandlerContext, tabledAtBlock: bigint) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { tabledAtBlock },
  }) as unknown as (SubstrateDemocracyProposal | undefined);
}

const findByStatus = async (ctx: EventHandlerContext, network: SubstrateNetwork, status: string) => {
  return ctx.store.find(SubstrateDemocracyProposal, {
    where: { network, status },
  }) as unknown as SubstrateDemocracyProposal[];
}

export default {
  getByProposalIndex,
  getByTabledAtBlock,
  findByStatus
}