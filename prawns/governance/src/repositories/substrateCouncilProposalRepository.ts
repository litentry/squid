import { SubstrateCouncilProposal, SubstrateNetwork } from '../model';
import { Store } from '@subsquid/typeorm-store';

const getByProposalHash = async (
  store: Store,
  network: SubstrateNetwork,
  proposalHashArr: Uint8Array
) => {
  const proposalHash = '0x' + Buffer.from(proposalHashArr).toString('hex');
  return store.findOne(SubstrateCouncilProposal, {
    where:{ proposalHash, network },
    relations: {'account': true}
  }) as unknown as SubstrateCouncilProposal | undefined;
};

export default {
  getByProposalHash,
};
