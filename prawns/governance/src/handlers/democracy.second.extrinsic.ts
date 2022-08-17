import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import { SubstrateDemocracyProposalSecond, SubstrateNetwork } from '../model';
import substrateDemocracyProposalRepository from '../repositories/substrateDemocracyProposalRepository';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import { getDemocracySecondCall } from './typeGetters/getDemocracySecondCall';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const accountAddress = getCallOriginAccount(ctx.call.origin, network);
    assert(accountAddress);
    const publicKey = decodeAddress(accountAddress);
    const call = getDemocracySecondCall(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: accountAddress,
      publicKey,
      network,
    });
    account.totalDemocracyProposalSeconds =
      account.totalDemocracyProposalSeconds + 1;
    account.totalProposalSeconds = account.totalDemocracyProposalSeconds; // Deprecated
    await ctx.store.save(account);

    const proposal =
      await substrateDemocracyProposalRepository.getByProposalIndex(
        ctx,
        network,
        call.proposal
      );

    if (!proposal) {
      throw new Error(`Proposal not found`);
    }

    const vote = new SubstrateDemocracyProposalSecond({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      proposal,
      upperBound: call.upperBound,
    });

    await ctx.store.save(vote);
  };
