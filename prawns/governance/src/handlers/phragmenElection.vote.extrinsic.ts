import { CallHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, encodeAddress } from '../utils';
import { SubstrateElectionVote, SubstrateNetwork } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getPhragmenElectionVoteCall } from './typeGetters/getPhragmenElectionVoteCall';
import { Store } from '@subsquid/typeorm-store';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import assert from 'assert';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const address = getCallOriginAccount(ctx.extrinsic.call.origin, network);
    assert(address);
    const publicKey = decodeAddress(address);
    const call = getPhragmenElectionVoteCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: address,
      publicKey,
      network,
    });
    account.totalElectionVotes = account.totalElectionVotes + 1;
    await ctx.store.save(account);

    const vote = new SubstrateElectionVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      candidates: call.votes.map((candidate) =>
        encodeAddress(network, candidate)
      ),
      amount: call.value,
    });
    await ctx.store.save(vote);
  };
