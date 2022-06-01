import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateDemocracyProposal } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getDemocracyProposedEvent } from './typeGetters/getDemocracyProposedEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getDemocracyProposedEvent(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalDemocracyProposals = account.totalDemocracyProposals + 1;
    await ctx.store.save(account);

    const proposal = new SubstrateDemocracyProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: event.proposalIndex,
      amount: event.deposit
    });

    await ctx.store.save(proposal);
  };

