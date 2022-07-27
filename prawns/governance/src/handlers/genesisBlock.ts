import { SubstrateNetwork, SubstrateTechnicalCommitteeMembership } from '../model';
import { BlockHandlerContext } from '@subsquid/substrate-processor';
import { getTechnicalCommitteeMembersStorage } from './typeGetters/getTechnicalCommitteeMembersStorage';
import { decodeAddress, encodeAddress, getOrCreateGovernanceAccount } from '../utils';
import { getTechnicalMembershipMembersStorage } from './typeGetters/getTechnicalMembershipMembersStorage';

export default (network: SubstrateNetwork) =>
  async (ctx: BlockHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);

    const technicalCommitteeMembers = await getTechnicalMembershipMembersStorage(ctx, network);
console.log(technicalCommitteeMembers);

    if (technicalCommitteeMembers) {
      await Promise.all(technicalCommitteeMembers.map(async (accountId, n) => {

        const account = await getOrCreateGovernanceAccount(ctx.store, {
          id: encodeAddress(network, accountId),
          rootAccount: decodeAddress(accountId),
          network
        });

        const technicalCommitteeMembership = new SubstrateTechnicalCommitteeMembership({
          id: `${network}:${blockNumber}:${n}`,
          network,
          blockNumber,
          date,
          isCurrentMember: true,
          account
        });

        return ctx.store.save([account, technicalCommitteeMembership]);
      }));
    }
  }