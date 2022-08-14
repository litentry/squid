import { SubstrateDemocracyProposal, SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const getByProposalIndex = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalIndex: number
) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { id: `${network}:${proposalIndex}` },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const getByProposalHash = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalHash: string
) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { id: `${network}:${proposalHash}` },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const getByTabledAtBlock = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  tabledAtBlock: bigint
) => {
  return ctx.store.get(SubstrateDemocracyProposal, {
    where: { tabledAtBlock, network },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const findByStatus = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  status: SubstrateDemocracyProposalStatus
) => {
  return ctx.store.findBy(SubstrateDemocracyProposal, { network, status }) as unknown as SubstrateDemocracyProposal[];
};

export default {
  getByProposalIndex,
  getByProposalHash,
  getByTabledAtBlock,
  findByStatus,
};
