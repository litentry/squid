import { decodeHex, EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateNetwork,
  SubstrateStakingActionHistory,
  SubstrateStakingActionType,
  SubstrateStakingNominatorAccount,
  SubstrateStakingStashAccount,
  SubstrateStakingValidatorAccount,
} from '../model';
import {
  decodeAddress,
  encodeAddress,
  getOrCreate,
  getRegistry,
} from '../utils';
import { getStakingBondedEvent } from './typeGetters/getStakingBondedEvent';
import { getStakingChilledEvent } from './typeGetters/getStakingChilledEvent';
import { getStakingKickedEvent } from './typeGetters/getStakingKickedEvent';
import { getStakingPayoutStartedEvent } from './typeGetters/getStakingPayoutStartedEvent';
import { getStakingRewardedEvent } from './typeGetters/getStakingRewardedEvent';
import { getStakingSlashedEvent } from './typeGetters/getStakingSlashedEvent';
import { getStakingUnbondedEvent } from './typeGetters/getStakingUnbondedEvent';
import { getStakingWithdrawnEvent } from './typeGetters/getStakingWithdrawnEvent';
import { Store } from '@subsquid/typeorm-store';
import assert from 'assert';

export default (
    network: SubstrateNetwork,
    tokenIndex: number,
    action: SubstrateStakingActionType
  ) =>
  async (ctx: EventHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const symbol = getRegistry(network).symbols[tokenIndex];

    const data: any = {
      amount: BigInt(0),
    };

    switch (ctx.event.name.split('.')[1]) {
      case SubstrateStakingActionType.Bonded:
        const stakingBondedEvent = getStakingBondedEvent(ctx, network);

        data.amount = stakingBondedEvent.amount;
        data.stash = await getOrCreateStash(
          ctx,
          stakingBondedEvent.stash,
          symbol,
          network
        );

        if (ctx.event.extrinsic) {
          const callerId = getOriginAccountId(ctx.event.call.origin, network);
          assert(callerId, `Can't decode caller`);
          data.nominator = await getOrCreateNominator(
            ctx,
            callerId,
            symbol,
            network
          );
        } else {
          throw new Error(
            `StakingActionEvent::bonded event does not have a extrinsic. Block number: ${blockNumber}`
          );
        }

        break;

      case SubstrateStakingActionType.Unbonded:
        const stakingUnbondedEvent = getStakingUnbondedEvent(ctx, network);

        data.amount = stakingUnbondedEvent.amount;
        data.stash = await getStash(ctx, stakingUnbondedEvent.stash);

        if (ctx.event.extrinsic) {
          const callerId = getOriginAccountId(ctx.event.call.origin, network);
          assert(callerId, `Can't decode caller`);
          data.nominator = await getOrCreateNominator(
            ctx,
            callerId,
            symbol,
            network
          );
        } else {
          throw new Error(
            `StakingActionEvent::unbonded event does not have a extrinsic. Block number: ${blockNumber}`
          );
        }

        break;

      case SubstrateStakingActionType.Chilled:
        const stakingChilledEvent = getStakingChilledEvent(ctx, network);

        data.stash = await getStash(ctx, stakingChilledEvent.stash);

        break;

      case SubstrateStakingActionType.Kicked:
        const stakingKickedEvent = getStakingKickedEvent(ctx, network);

        data.nominator = await getOrCreateNominator(
          ctx,
          stakingKickedEvent.nominator,
          symbol,
          network
        );
        data.stash = await getStash(ctx, stakingKickedEvent.stash);

        break;

      case SubstrateStakingActionType.PayoutStarted:
        const stakingPayoutStartedEvent = getStakingPayoutStartedEvent(
          ctx,
          network
        );

        data.stash = await getStash(ctx, stakingPayoutStartedEvent.stash);

        break;

      case SubstrateStakingActionType.Rewarded:
        const stakingRewardedEvent = getStakingRewardedEvent(ctx, network);

        data.amount = stakingRewardedEvent.amount;
        data.stash = await getStash(ctx, stakingRewardedEvent.stash);

        break;

      case SubstrateStakingActionType.Slashed:
        const stakingSlashedEvent = getStakingSlashedEvent(ctx, network);

        data.amount = stakingSlashedEvent.amount;
        data.validator = await getOrCreateValidator(
          ctx,
          stakingSlashedEvent.validator,
          symbol,
          network
        );

        break;

      case SubstrateStakingActionType.Withdrawn:
        const stakingWithdrawnEvent = getStakingWithdrawnEvent(ctx, network);

        data.amount = stakingWithdrawnEvent.amount;
        data.stash = await getStash(ctx, stakingWithdrawnEvent.stash);

        break;

      default: {
        console.log(ctx.event);
        throw new Error('getStakingEvent::method not supported');
      }
    }

    const actionModel = new SubstrateStakingActionHistory({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      action,
      date,
      ...data,
    });

    await ctx.store.save(actionModel);
  };

async function getOrCreateNominator(
  ctx: EventHandlerContext<Store>,
  account: string,
  symbol: string,
  network: SubstrateNetwork
): Promise<SubstrateStakingNominatorAccount | undefined> {
  const nominatorModel = await getOrCreate(
    ctx.store,
    SubstrateStakingNominatorAccount,
    {
      id: `${account}:${symbol}`,
      account,
      publicKey: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(nominatorModel);
  return nominatorModel;
}

async function getOrCreateValidator(
  ctx: EventHandlerContext<Store>,
  account: string,
  symbol: string,
  network: SubstrateNetwork
): Promise<SubstrateStakingValidatorAccount | undefined> {
  const validatorModel = await getOrCreate(
    ctx.store,
    SubstrateStakingValidatorAccount,
    {
      id: `${account}:${symbol}`,
      account,
      publicKey: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(validatorModel);
  return validatorModel;
}

async function getOrCreateStash(
  ctx: EventHandlerContext<Store>,
  account: string,
  symbol: string,
  network: SubstrateNetwork
): Promise<SubstrateStakingStashAccount | undefined> {
  const stashModel = await getOrCreate(
    ctx.store,
    SubstrateStakingStashAccount,
    {
      id: `${account}:${symbol}`,
      account,
      publicKey: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(stashModel);
  return stashModel;
}

async function getStash(
  ctx: EventHandlerContext<Store>,
  account: string
): Promise<SubstrateStakingStashAccount | undefined> {
  return await ctx.store.get(SubstrateStakingStashAccount, account);
}

function getOriginAccountId(origin: any, network: SubstrateNetwork) {
  if (!origin) return undefined;
  switch (origin.__kind) {
    case 'system':
      switch (origin.value.__kind) {
        case 'Signed':
          return encodeAddress(network, decodeHex(origin.value.value));
        default:
          return undefined;
      }
    default:
      return undefined;
  }
}
