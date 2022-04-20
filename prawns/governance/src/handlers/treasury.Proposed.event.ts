import { EventHandlerContext, ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateBountyProposal, SubstrateNetwork, SubstrateTreasuryProposal } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getTreasuryProposedEvent} from "./typeGetters/getTreasuryProposedEvent";
import { getTreasuryProposedSpendCall} from "./typeGetters/getTreasuryProposeSpendCall";

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getTreasuryProposedEvent(ctx, network);
    const call = getTreasuryProposedSpendCall(<ExtrinsicHandlerContext>ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalTreasurySpendProposals++;

    await ctx.store.save(account);

    const proposal = new SubstrateTreasuryProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: event.proposalIndex,
      beneficiary: '0x' + Buffer.from(call.beneficiary).toString('hex'),
      value: call.value
    });

    await ctx.store.save(proposal);
  };
