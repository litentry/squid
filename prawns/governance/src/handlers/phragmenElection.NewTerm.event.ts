import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import {
  SubstrateNetwork,
  SubstratePhragmenElectionMemberTerm,
} from '../model';
import substratePhragmenElectionMemberTermRepository from '../repositories/substratePhragmenElectionMemberTermRepository';
import {
  decodeAddress,
  encodeAddress,
  getOrCreateGovernanceAccount,
} from '../utils';
import { getPhragmenElectionNewTermEvent } from './typeGetters/getPhragmenElectionNewTermEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event) {
      return;
    }

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const event = getPhragmenElectionNewTermEvent(ctx, network);

    const oldMemberTerms = (
      await substratePhragmenElectionMemberTermRepository.findActiveMembers(
        ctx.store,
        network
      )
    ).map((oldMemberTerm) => {
      oldMemberTerm.isCurrentTerm = false;
      return oldMemberTerm;
    });
    const newMemberTermPromises = event.newMembers.map(async (member, n) => {
      const account = await getOrCreateGovernanceAccount(ctx.store, {
        id: encodeAddress(network, member[0]),
        publicKey: decodeAddress(member[0]),
        network,
      });

      return new SubstratePhragmenElectionMemberTerm({
        id: `${network}:${blockNumber.toString()}:${
          ctx.event.indexInBlock
        }:${n}`,
        network,
        blockNumber,
        date,
        isCurrentTerm: true,
        account,
        backing: member[1],
      });
    });

    const newMemberTerms = await Promise.all(newMemberTermPromises);
    const accounts = newMemberTerms.map((nmt) => nmt.account);

    await ctx.store.save(accounts);
    await ctx.store.save([...oldMemberTerms, ...newMemberTerms]);
  };
