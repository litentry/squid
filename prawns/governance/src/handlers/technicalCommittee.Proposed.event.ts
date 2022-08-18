import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import {
  SubstrateTechnicalCommitteeProposal,
  SubstrateNetwork,
} from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getTechnicalCommitteeProposedEvent } from './typeGetters/getTechnicalCommitteeProposedEvent';
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
    const event = getTechnicalCommitteeProposedEvent(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: address,
      publicKey,
      network,
    });
    account.totalTechnicalCommitteeProposals =
      account.totalTechnicalCommitteeProposals + 1;
    await ctx.store.save(account);

    const proposal = new SubstrateTechnicalCommitteeProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      proposalIndex: event.proposalIndex,
      proposalHash: '0x' + Buffer.from(event.proposalHash).toString('hex'),
      threshold: event.threshold,
    });

    await ctx.store.save(proposal);
  };
