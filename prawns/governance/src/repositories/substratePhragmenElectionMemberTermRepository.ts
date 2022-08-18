import { EventHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import {
  SubstrateNetwork,
  SubstratePhragmenElectionMemberTerm,
} from '../model';

const findActiveMembers = async (
  store: Store,
  network: SubstrateNetwork
) => {
  return store.find(SubstratePhragmenElectionMemberTerm, {
    where: { network, isCurrentTerm: true },
    relations: { account: true },
  }) as unknown as SubstratePhragmenElectionMemberTerm[];
};

export default {
  findActiveMembers,
};
