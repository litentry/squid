import {
  CallHandlerContext,
} from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateBountyProposal, SubstrateNetwork } from '../model';
import { getOrCreateGovernanceAccount } from '../utils';
import { getBountiesBountyProposedEvent } from './typeGetters/getBountiesBountyProposedEvent';
import { getBountiesProposedCall } from './typeGetters/getBountiesProposedCall';
import { Store } from '@subsquid/typeorm-store';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import assert from 'assert';
import { EventHandlerContext } from '@subsquid/substrate-processor/lib';
import { createCallHandlerFromEventHandler } from '../utils/createCallHandlerFromEventHandler';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const address = getCallOriginAccount(ctx.event.call?.origin, network);
    assert(address);
    const publicKey = decodeAddress(address);
    const event = getBountiesBountyProposedEvent(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: address,
      publicKey: address,
      network,
    });
    account.totalBountyProposals++;
    await ctx.store.save(account);

    const callHandler = createCallHandlerFromEventHandler(ctx);
    assert(callHandler);
    const call = getBountiesProposedCall(
      callHandler,
      network
    );

    const description = Buffer.from(call.description).toString();
    const value = call.value;

    const proposal = new SubstrateBountyProposal({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      account,
      publicKey,
      blockNumber,
      date,
      proposalIndex: event.index,
      description,
      value,
    });

    await ctx.store.save(proposal);
  };
