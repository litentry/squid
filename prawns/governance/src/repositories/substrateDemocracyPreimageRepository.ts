import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyPreimage, SubstrateNetwork } from '../model';

const getByProposalHash = async (
  store: Store,
  network: SubstrateNetwork,
  proposalHash: Uint8Array | string
) => {
  const proposalHashString =
    typeof proposalHash === 'string'
      ? proposalHash
      : '0x' + Buffer.from(proposalHash).toString('hex');
  return store.findOneBy(SubstrateDemocracyPreimage, {
    id: `${network}:${proposalHashString}`,
  }) as unknown as SubstrateDemocracyPreimage | undefined;
};

export default {
  getByProposalHash,
};
