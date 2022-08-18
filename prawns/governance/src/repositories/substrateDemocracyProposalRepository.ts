import { Store } from '@subsquid/typeorm-store';
import {
  SubstrateDemocracyProposal,
  SubstrateDemocracyProposalStatus,
  SubstrateNetwork,
} from '../model';

const getByProposalIndex = async (
  store: Store,
  network: SubstrateNetwork,
  proposalIndex: number
) => {
  return store.get(SubstrateDemocracyProposal, {
    where: { id: `${network}:${proposalIndex}` },
    relations: { account: true },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const getByProposalHash = async (
  store: Store,
  network: SubstrateNetwork,
  proposalHash: string
) => {
  return store.get(SubstrateDemocracyProposal, {
    where: { id: `${network}:${proposalHash}` },
    relations: { account: true },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const getByTabledAtBlock = async (
  store: Store,
  network: SubstrateNetwork,
  tabledAtBlock: bigint
) => {
  return store.get(SubstrateDemocracyProposal, {
    where: { tabledAtBlock, network },
    relations: { account: true },
  }) as unknown as SubstrateDemocracyProposal | undefined;
};

const findByStatus = async (
  store: Store,
  network: SubstrateNetwork,
  status: SubstrateDemocracyProposalStatus
) => {
  return store.findBy(SubstrateDemocracyProposal, {
    network,
    status,
  }) as unknown as SubstrateDemocracyProposal[];
};

export default {
  getByProposalIndex,
  getByProposalHash,
  getByTabledAtBlock,
  findByStatus,
};
