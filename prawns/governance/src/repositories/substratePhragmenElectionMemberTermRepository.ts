import {
  SubstrateNetwork,
  SubstratePhragmenElectionMemberTerm,
} from '../model';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

const findActiveMembers = async (
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
) => {
  return ctx.store.find(SubstratePhragmenElectionMemberTerm, {
    where: { network, isCurrentTerm: true },
  }) as unknown as SubstratePhragmenElectionMemberTerm[];
};

export default {
  findActiveMembers,
};
