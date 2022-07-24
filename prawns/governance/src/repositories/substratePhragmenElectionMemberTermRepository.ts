import {
  SubstrateNetwork,
  SubstratePhragmenElectionMemberTerm,
} from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';

const findActiveMembers = async (
  ctx: EventHandlerContext,
  network: SubstrateNetwork
) => {
  return ctx.store.find(SubstratePhragmenElectionMemberTerm, {
    where: { network, isCurrentTerm: true },
  }) as unknown as SubstratePhragmenElectionMemberTerm[];
};

export default {
  findActiveMembers,
};
