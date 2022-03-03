import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateProposalSecond } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getDemocracySecondCall } from './typeGetters/getDemocracySecondCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    const call = getDemocracySecondCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalProposalSeconds = account.totalProposalSeconds + 1;
    await ctx.store.save(account);

    const vote = new SubstrateProposalSecond({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: call.proposal,
      upperBound: call.upperBound,
    });

    await ctx.store.save(vote);
  };
