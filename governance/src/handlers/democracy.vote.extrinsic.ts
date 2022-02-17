import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateGovernanceAccount,
  SubstrateNetwork,
  SubstrateVote,
} from '../model';
import { getOrCreate } from '../utils/store';
import getAccountHex from '../utils/getAccountHex';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = getAccountHex(ctx.extrinsic.signer);

    const account = await getOrCreate(ctx.store, SubstrateGovernanceAccount, {
      id: ctx.extrinsic.signer,
      rootAccount,
      network,
      totalVotes: 0,
    });
    account.totalVotes = account.totalVotes + 1;
    await ctx.store.save(account);

    const vote = new SubstrateVote({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
    });

    await ctx.store.save(vote);
  };
