import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';
import subsquare from '../clients/subsquare';
import {
  SubstrateNetwork,
  SubstrateTreasuryProposal,
  SubstrateTreasuryProposalStatus,
} from '../model';
import {
  decodeAddress,
  encodeAddress,
  getOrCreateGovernanceAccount,
} from '../utils';
import { createCallHandlerFromEventHandler } from '../utils/createCallHandlerFromEventHandler';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import { getTreasuryProposedEvent } from './typeGetters/getTreasuryProposedEvent';
import { getTreasuryProposedSpendCall } from './typeGetters/getTreasuryProposeSpendCall';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    const substrateCall = ctx.event.call;
    if (!substrateCall) {
      return;
    }

    const accountAddress = getCallOriginAccount(substrateCall.origin, network);
    assert(accountAddress);
    const publicKey = decodeAddress(accountAddress);

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getTreasuryProposedEvent(ctx, network);
    const subsquareProposal = await subsquare.getTreasuryProposal(
      network,
      event.proposalIndex
    );

    // proposer
    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: publicKey,
      publicKey,
      network,
    });
    account.totalTreasurySpendProposals++;
    await ctx.store.save(account);

    let beneficiary = undefined;
    let beneficiaryAccount = undefined;
    let value = BigInt(0);

    // beneficiary and value
    try {
      const callHandler = createCallHandlerFromEventHandler(ctx);
      if (!callHandler) {
        throw new Error(
          'Could not create callHandlerContext from EventHandlerContext'
        );
      }

      const callArgs = getTreasuryProposedSpendCall(callHandler, network);
      value = callArgs.value;
      beneficiary = decodeAddress(callArgs.beneficiary);
      beneficiaryAccount = await getOrCreateGovernanceAccount(ctx.store, {
        id: encodeAddress(network, callArgs.beneficiary),
        publicKey: beneficiary,
        network,
      });
      await ctx.store.save(beneficiaryAccount);
    } catch (e) {
      console.warn(
        `treasury.proposed event: extrinsic hidden in wrapped call - ${substrateCall.name}, not setting beneficiary or value fields`
      );
    }

    const proposal = new SubstrateTreasuryProposal({
      id: `${network}:${event.proposalIndex}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      title: subsquareProposal.title,
      description: subsquareProposal.content,
      status: SubstrateTreasuryProposalStatus.proposed,
      proposalIndex: event.proposalIndex,
      beneficiary,
      beneficiaryAccount,
      value,
    });

    await ctx.store.save(proposal);
  };
