import { SubstrateDemocracyPreimage, SubstrateNetwork } from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const getByProposalHash = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  proposalHash: Uint8Array | string
) => {
  const proposalHashString =
    typeof proposalHash === 'string'
      ? proposalHash
      : '0x' + Buffer.from(proposalHash).toString('hex');
  return ctx.store.findOneBy(SubstrateDemocracyPreimage, { id: `${network}:${proposalHashString}` },
  ) as unknown as SubstrateDemocracyPreimage | undefined;
};

export default {
  getByProposalHash,
};
