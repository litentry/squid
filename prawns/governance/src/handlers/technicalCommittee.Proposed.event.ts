import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import {
  SubstrateTechnicalCommitteeProposal,
  SubstrateNetwork,
} from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getTechnicalCommitteeProposedEvent } from './typeGetters/getTechnicalCommitteeProposedEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getTechnicalCommitteeProposedEvent(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalTechnicalCommitteeProposals =
      account.totalTechnicalCommitteeProposals + 1;
    await ctx.store.save(account);

    const proposal = new SubstrateTechnicalCommitteeProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: event.proposalIndex,
      proposalHash: '0x' + Buffer.from(event.proposalHash).toString('hex'),
      threshold: event.threshold,
    });

    await ctx.store.save(proposal);
  };
