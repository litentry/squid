import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import subsquare from '../clients/subsquare';
import {
  SubstrateDemocracyProposal,
  SubstrateDemocracyProposalStatus,
  SubstrateNetwork,
} from '../model';
import substrateDemocracyPreimageRepository from '../repositories/substrateDemocracyPreimageRepository';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import { getDemocracyProposedEvent } from './typeGetters/getDemocracyProposedEvent';

const getProposalHash = (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
) => {
  const call = ctx.event.call;

  if (!call) {
    throw new Error(
      `Expected to have a call in the event context in block ${ctx.block.height}`
    );
  }

  const proposalHashArg = call.args.proposal_hash || call.args.proposalHash;
  if (proposalHashArg) {
    return proposalHashArg;
  }

  if (
    network === SubstrateNetwork.kusama &&
    (ctx.block.height === 25947 || ctx.block.height === 37922)
  ) {
    return '';
  }

  throw new Error(`Failed to find proposalHash`);
};

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event || !ctx.event.call) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const accountAddress = getCallOriginAccount(ctx.event.call.origin, network);
    assert(accountAddress);
    const publicKey = decodeAddress(accountAddress);
    const event = getDemocracyProposedEvent(ctx, network);
    const proposalHash = getProposalHash(ctx, network);
    const subsquareProposal = await subsquare.getDemocracyProposal(
      network,
      event.proposalIndex
    );

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: accountAddress,
      publicKey,
      network,
    });
    account.totalDemocracyProposals = account.totalDemocracyProposals + 1;
    await ctx.store.save(account);

    const preimage =
      await substrateDemocracyPreimageRepository.getByProposalHash(
        ctx,
        network,
        proposalHash
      );

    const proposal = new SubstrateDemocracyProposal({
      id: `${network}:${event.proposalIndex}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      updatedAt: date,
      proposalHash,
      preimage,
      proposalIndex: event.proposalIndex,
      title: subsquareProposal.title,
      description: subsquareProposal.content,
      depositAmount: event.deposit,
      status: SubstrateDemocracyProposalStatus.proposed,
    });

    await ctx.store.save(proposal);
  };
