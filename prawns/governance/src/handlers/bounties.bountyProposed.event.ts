import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateBountyProposal, SubstrateNetwork } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getBountiesBountyProposedEvent } from './typeGetters/getBountiesBountyProposedEvent';
import { getBountiesProposedCall } from './typeGetters/getBountiesProposedCall';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getBountiesBountyProposedEvent(ctx, network);
    const call = getBountiesProposedCall(<ExtrinsicHandlerContext>ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalBountyProposals++;

    await ctx.store.save(account);

    const proposal = new SubstrateBountyProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: event.index,
      description: Buffer.from(call.description).toString(),
      value: call.value
    });

    await ctx.store.save(proposal);
  };

