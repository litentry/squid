import { SubstrateDemocracyPreimage, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';

const getByProposalHash = async (
  ctx: EventHandlerContext,
  network: SubstrateNetwork,
  proposalHash: Uint8Array | string
) => {
  const proposalHashString =
    typeof proposalHash === 'string'
      ? proposalHash
      : '0x' + Buffer.from(proposalHash).toString('hex');
  return ctx.store.get(SubstrateDemocracyPreimage, {
    where: { id: `${network}:${proposalHashString}` },
  }) as unknown as SubstrateDemocracyPreimage | undefined;
};

export default {
  getByProposalHash,
};
