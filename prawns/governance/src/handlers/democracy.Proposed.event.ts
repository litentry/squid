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
    const proposalHashArg = ctx.event.extrinsic.args.find(arg => arg.name === 'proposal_hash' || arg.name === 'proposalHash');

    if (!proposalHashArg) {
      throw new Error(`Failed to find proposalHash`);
    }

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalDemocracyProposals = account.totalDemocracyProposals + 1;
    account.totalProposals = account.totalDemocracyProposals; // Deprecated
    await ctx.store.save(account);

    const proposal = new SubstrateDemocracyProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      updatedAt: date,
      proposalHash: proposalHashArg.value as string,
      proposalIndex: event.proposalIndex,
      depositAmount: event.deposit,
      status: 'proposed'
    });

    await ctx.store.save(proposal);
  };

