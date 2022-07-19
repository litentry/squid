import {
  EventHandlerContext,
  ExtrinsicHandlerContext,
} from '@subsquid/substrate-processor';
import { decodeAddress, encodeAddress } from '../utils';
import { SubstrateNetwork, SubstrateTreasuryProposal } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getTreasuryProposedEvent } from './typeGetters/getTreasuryProposedEvent';
import { getTreasuryProposedSpendCall } from './typeGetters/getTreasuryProposeSpendCall';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event.extrinsic) {
      return;
    }
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);
    const event = getTreasuryProposedEvent(ctx, network);

    // proposer
    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalTreasurySpendProposals++;
    await ctx.store.save(account);

    let beneficiary = undefined;
    let beneficiaryAccount = undefined;
    let value = BigInt(0);

    // beneficiary and value
    try {
      const call = getTreasuryProposedSpendCall(
        <ExtrinsicHandlerContext>ctx,
        network
      );
      value = call.value;
      beneficiary = decodeAddress(call.beneficiary);
      beneficiaryAccount = await getOrCreateGovernanceAccount(ctx.store, {
        id: encodeAddress(network, call.beneficiary),
        rootAccount: beneficiary,
        network,
      });
      await ctx.store.save(beneficiaryAccount);
    } catch (e) {
      console.warn(
        `treasury.proposed event: extrinsic hidden in wrapped call - ${ctx.extrinsic?.name}, not setting beneficiary or value fields`
      );
    }

    const proposal = new SubstrateTreasuryProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      rootAccount,
      blockNumber,
      date,
      proposalIndex: event.proposalIndex,
      beneficiary,
      beneficiaryAccount,
      value,
    });

    await ctx.store.save(proposal);
  };
