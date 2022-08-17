import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateDemocracyPreimage, SubstrateNetwork } from '../model';

const getByProposalHash = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalHash: Uint8Array | string
) => {
  console.log(proposalHash);
  const proposalHashString =
    typeof proposalHash === 'string'
      ? proposalHash
      : '0x' + Buffer.from(proposalHash).toString('hex');
  return ctx.store.findOneBy(SubstrateDemocracyPreimage, {
    id: `${network}:${proposalHashString}`,
  }) as unknown as SubstrateDemocracyPreimage | undefined;
};

export default {
  getByProposalHash,
};
