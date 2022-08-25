import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import { SubstrateCouncilProposal, SubstrateNetwork } from '../model';
import { getCouncilProposedEvent } from './typeGetters/getCouncilProposedEvent';
import { getCouncilProposalOfStorage } from './typeGetters/getCouncilProposalOfStorage';
import { Store } from '@subsquid/typeorm-store';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import assert from 'assert';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const address = getCallOriginAccount(ctx.event.call.origin, network);
    assert(address);
    const publicKey = decodeAddress(address);
    const event = getCouncilProposedEvent(ctx, network);

    const storage = await getCouncilProposalOfStorage(
      ctx,
      network,
      event.proposalHash
    );

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: address,
      publicKey,
      network,
    });

    account.totalCouncilProposals = account.totalCouncilProposals + 1;
    await ctx.store.save(account);

    const proposal = new SubstrateCouncilProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      publicKey,
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
