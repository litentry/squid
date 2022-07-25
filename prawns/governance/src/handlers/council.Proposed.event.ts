import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import { SubstrateCouncilProposal, SubstrateNetwork } from '../model';
import { getCouncilProposedEvent } from './typeGetters/getCouncilProposedEvent';
import { getCouncilProposalOfStorage } from './typeGetters/getCouncilProposalOfStorage';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getCouncilProposedEvent(ctx, network);

    const storage = await getCouncilProposalOfStorage(
      ctx,
      network,
      event.proposalHash
    );

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalCouncilProposals = account.totalCouncilProposals + 1;
    await ctx.store.save(account);

    const proposal = new SubstrateCouncilProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      lastUpdate: date,
      status: 'proposed',
      proposalIndex: event.proposalIndex,
      proposalId: storage?.value?.proposalId,
      proposalHash: '0x' + Buffer.from(event.proposalHash).toString('hex'),
      threshold: event.threshold,
      ayeCount: 0,
      nayCount: 0,
      pallet: storage?.__kind,
      method: storage?.value?.__kind,
    });

    await ctx.store.save(proposal);
  };
