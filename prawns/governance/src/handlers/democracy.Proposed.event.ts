import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import { SubstrateDemocracyProposal, SubstrateDemocracyProposalStatus, SubstrateNetwork } from '../model';
import { getDemocracyProposedEvent } from './typeGetters/getDemocracyProposedEvent';
import subsquare from '../clients/subsquare';
import substrateDemocracyPreimageRepository from '../repositories/substrateDemocracyPreimageRepository';

const getProposalHash = (ctx: EventHandlerContext, network: SubstrateNetwork) => {

  const args = ctx.event!.extrinsic!.args;

  if (ctx.event.extrinsic?.method === 'batchAll') {
    const calls = args[0].value as { args: {[key: string]: any} }[];
    const batchProposeArgs = calls.filter(call => call.args && call.args.proposal_hash);
    if (batchProposeArgs.length === 0) {
      throw new Error(`Unable to find propose args in batch in block ${ctx.block.height}`);
    }
    if (batchProposeArgs.length > 1) {
      throw new Error(`Found multiple proposal_hash args in batch in block ${ctx.block.height}`);
    }
    return batchProposeArgs[0].args.proposal_hash;
  } else {

    const proposalHashArg = args.find(arg => arg.name === 'proposal_hash' || arg.name === 'proposalHash');

    if (proposalHashArg) {
      return proposalHashArg.value as string;
    }
  }

  if (network === SubstrateNetwork.kusama && (ctx.block.height === 25947 || ctx.block.height === 37922)) {
    return '';
  }

  throw new Error(`Failed to find proposalHash`);
};

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {

    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getDemocracyProposedEvent(ctx, network);
    const proposalHash = getProposalHash(ctx, network);
    const subsquareProposal = await subsquare.getDemocracyProposal(network, event.proposalIndex);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network
    });
    account.totalDemocracyProposals = account.totalDemocracyProposals + 1;
    await ctx.store.save(account);

    const preimage = await substrateDemocracyPreimageRepository.getByProposalHash(ctx, network, proposalHash)

    const proposal = new SubstrateDemocracyProposal({
      id: `${network}:${event.proposalIndex}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      updatedAt: date,
      proposalHash,
      preimage,
      proposalIndex: event.proposalIndex,
      title: subsquareProposal.title,
      description: subsquareProposal.content,
      depositAmount: event.deposit,
      status: SubstrateDemocracyProposalStatus.proposed
    });

    await ctx.store.save(proposal);
  };

