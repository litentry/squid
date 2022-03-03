import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  decodeAddress,
  encodeAddress,
  getRegistry,
  getOrCreate,
} from '../utils';
import {
  SubstrateCrowdloanContributionAccount,
  SubstrateCrowdloanContribution,
  SubstrateNetwork,
} from '../model';
import { getContributedEvent } from './typeGetters/getContributedEvent';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];
    const {
      amount,
      paraId,
      address: rawAddress,
    } = getContributedEvent(ctx, network);

    const address = encodeAddress(network, rawAddress);
    const rootAccount = decodeAddress(rawAddress);

    const account = await getOrCreate(
      ctx.store,
      SubstrateCrowdloanContributionAccount,
      {
        id: address,
        rootAccount,
        network,
        totalCrowdloanContributions: 0,
      }
    );
    account.totalCrowdloanContributions =
      account.totalCrowdloanContributions + 1;
    await ctx.store.save(account);

    const contribution = new SubstrateCrowdloanContribution({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      amount,
      paraId,
      account,
      rootAccount,
    });

    await ctx.store.save(contribution);
  };
