import { SubstrateDemocracyProposal, SubstrateNetwork } from '../model';
import {EventHandlerContext} from "@subsquid/substrate-processor";

const getByProposalIndex = async (ctx: EventHandlerContext, network: SubstrateNetwork, proposalIndex: number) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { network, proposalIndex },
  }) as unknown as (SubstrateDemocracyProposal | undefined);
}

const getByTabledAtBlock = async (ctx: EventHandlerContext, network: SubstrateNetwork, tabledAtBlock: bigint) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { network, tabledAtBlock },
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