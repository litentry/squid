import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, encodeAddress } from 'prawn-utils';
import { SubstrateElectionVote, SubstrateNetwork } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getPhragmenElectionVoteCall } from './typeGetters/getPhragmenElectionVoteCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.extrinsic.signer);
    const call = getPhragmenElectionVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalElectionVotes = account.totalElectionVotes + 1;
    await ctx.store.save(account);

    const vote = new SubstrateElectionVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      candidates: call.votes.map((candidate) =>
        encodeAddress(network, candidate)
      ),
      amount: call.value,
    });
    await ctx.store.save(vote);
  };
