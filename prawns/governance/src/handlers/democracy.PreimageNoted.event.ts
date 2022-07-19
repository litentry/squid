import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateDemocracyPreimage,
  SubstrateDemocracyReferenda,
  SubstrateDemocracyReferendaStatus,
  SubstrateNetwork,
} from '../model';

import { getDemocracyPreimageNotedEvent } from './typeGetters/getDemocracyPreimageNotedEvent';
import { decodeAddress, getOrCreateGovernanceAccount } from '../utils';
import { getDemocracyPreimagesStorage } from './typeGetters/getDemocracyPreimageStorage';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = await getDemocracyPreimageNotedEvent(ctx, network);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: '0x' + Buffer.from(event.who).toString('hex'),
      rootAccount: decodeAddress(event.who),
      network,
    });
    await ctx.store.save(account);

    const proposalHash = '0x' + Buffer.from(event.proposalHash).toString('hex');
    const storagePreimage = await getDemocracyPreimagesStorage(
      ctx,
      network,
      event.proposalHash
    );

    if (!storagePreimage) {
      console.error('Unable to find preimage');
      return;
    }

    const decodedPreimage = (ctx._chain as any).scaleCodec.decodeBinary(
      ctx._chain.description.call,
      storagePreimage.data
    );
    const section = decodedPreimage.__kind;
    const method = decodedPreimage.value.__kind;

    const preimage = new SubstrateDemocracyPreimage({
      id: `${network}:${proposalHash}`,
      network,
      blockNumber,
      date,
      account,
      section,
      method,
      balance: event.deposit,
    });

    await ctx.store.save(preimage);
  };
