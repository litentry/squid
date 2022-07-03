import { EventHandlerContext } from '@subsquid/substrate-processor';
import {SubstrateCouncilProposal, SubstrateNetwork} from '../model';
import substrateCouncilProposalRepository from "../repositories/substrateCouncilProposalRepository";
import {getCouncilExecutedEvent} from "./typeGetters/getCouncilExecutedEvent";
import {decodeAddress, getOrCreateGovernanceAccount} from "../utils";
import {getCouncilProposalOfStorage} from "./typeGetters/getCouncilProposalOfStorage";

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event || !ctx.event.extrinsic) {
      return;
    }

    const event = getCouncilExecutedEvent(ctx, network);
    const date = new Date(ctx.block.timestamp);

    const blockNumber = BigInt(ctx.block.height);
    const rootAccount = decodeAddress(ctx.event.extrinsic.signer);

    const storage = await getCouncilProposalOfStorage(ctx, network, event.proposalHash);

    const account = await getOrCreateGovernanceAccount(ctx.store, {
      id: ctx.event.extrinsic.signer,
      rootAccount,
      network,
    });
    account.totalCouncilProposals = account.totalCouncilProposals + 1;
    await ctx.store.save(account);

    let councilProposal = await substrateCouncilProposalRepository.getByProposalHash(ctx, network, event.proposalHash);

    if (!councilProposal) {

      if (ctx.event.extrinsic.name !== "council.propose") {
        throw new Error("Council proposal not found and the extrinsic is not a proposal");
      }

      const proposalArgs = ctx.event.extrinsic.args as unknown as [{value: number}];

      councilProposal = new SubstrateCouncilProposal({
        id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
        network,
        account,
        rootAccount,
        blockNumber,
        date,
        lastUpdate: date,
        status: 'proposed',
        proposalId: storage?.value?.proposalId,
        proposalHash: '0x' + Buffer.from(event.proposalHash).toString('hex'),
        threshold: proposalArgs[0].value,
        ayeCount: 0,
        nayCount: 0,
        pallet: storage?.__kind,
        method: storage?.value?.__kind
      });
    }
    councilProposal.status = event.result ? 'executed' : 'execution_failed';
    councilProposal.lastUpdate = date;
    await ctx.store.save(councilProposal);
  };

