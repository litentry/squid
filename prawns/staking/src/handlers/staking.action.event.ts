import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateStakingActionHistory, SubstrateStakingActionType, SubstrateStakingNominatorAccount, SubstrateStakingStashAccount, SubstrateStakingValidatorAccount } from '../model';
import { decodeAddress, getOrCreate, getRegistry } from '../utils';
import { getStakingBondedEvent } from './typeGetters/getStakingBondedEvent';
import { getStakingChilledEvent } from './typeGetters/getStakingChilledEvent';
import { getStakingKickedEvent } from './typeGetters/getStakingKickedEvent';
import { getStakingPayoutStartedEvent } from './typeGetters/getStakingPayoutStartedEvent';
import { getStakingRewardedEvent } from './typeGetters/getStakingRewardedEvent';
import { getStakingSlashedEvent } from './typeGetters/getStakingSlashedEvent';
import { getStakingUnbondedEvent } from './typeGetters/getStakingUnbondedEvent';

// [
//   {
//     name: 'param0',
//     type: 'AccountId',
//     value: 'DS3BHe7a1MGwVQAD2VZ8HJnGJXovBKBtA11otY2LwJPG7Fu'
//   },
//   { name: 'param1', type: 'Balance', value: 10000000000 }
// ]
// {
//   id: '0001472195-000002-f3026',
//   name: 'staking.bondExtra',
//   method: 'bondExtra',
//   section: 'staking',
//   versionInfo: '132',
//   era: { mortalEra: '0x1500' },
//   signer: 'DS3BHe7a1MGwVQAD2VZ8HJnGJXovBKBtA11otY2LwJPG7Fu',
//   args: [
//     {
//       name: 'max_additional',
//       type: 'Compact<BalanceOf>',
//       value: 10000000000
//     }
//   ],
//   hash: '0x1c8f0605b067283ec0da323eed8befafce19bde2f88765bf20e52c461bcfad3c',
//   tip: 0n,
//   indexInBlock: 2
// }




// [
//   {
//     name: 'param0',
//     type: 'AccountId',
//     value: 'DuGZsgfYwQLn6LJNEysHob8ngAYBXmYk8GPWpQnCscd2MfB'
//   },
//   { name: 'param1', type: 'Balance', value: 12000000000000 }
// ]
// {
//   id: '0001472766-000003-a9beb',
//   name: 'staking.bond',
//   method: 'bond',
//   section: 'staking',
//   versionInfo: '132',
//   era: { mortalEra: '0xd503' },
//   signer: 'DuGZsgfYwQLn6LJNEysHob8ngAYBXmYk8GPWpQnCscd2MfB',
//   args: [
//     {
//       name: 'controller',
//       type: 'AccountId',
//       value: 'DuGZsgfYwQLn6LJNEysHob8ngAYBXmYk8GPWpQnCscd2MfB'
//     },
//     {
//       name: 'value',
//       type: 'Compact<BalanceOf>',
//       value: 12000000000000
//     },
//     {
//       name: 'payee',
//       type: '{"_enum":{"Staked":"Null","Stash":"Null","Controller":"Null","Account":"AccountId","None":"Null"}}',
//       value: [Object]
//     }
//   ],
//   hash: '0xc6af673ff3ee994c5a3adce398fb51c8819cd8a8a7ced7f49cbf5edcde0aa962',
//   tip: 0n,
//   indexInBlock: 3
// }

export default (network: SubstrateNetwork, tokenIndex: number, action: SubstrateStakingActionType) =>
  async (ctx: EventHandlerContext) => {
    const extrinsic = ctx.extrinsic;
    if (!extrinsic) {
      return;
    }

    const account = extrinsic.signer;
    const rootAccount = decodeAddress(account);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const symbol = getRegistry(network).symbols[tokenIndex];

    let data: any = {
      amount: BigInt(0)
    };

    switch (ctx.event.method) {
      case SubstrateStakingActionType.Bonded:
        const stakingBondedEvent = getStakingBondedEvent(ctx, network);

        data.amount = stakingBondedEvent.amount;
        data.stash = await getOrCreateStash(ctx, stakingBondedEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.Unbonded:
        const stakingUnbondedEvent = getStakingUnbondedEvent(ctx, network);

        data.amount = stakingUnbondedEvent.amount;
        data.stash = await getOrCreateStash(ctx, stakingUnbondedEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.Chilled:
        const stakingChilledEvent = getStakingChilledEvent(ctx, network);

        data.stash = await getOrCreateStash(ctx, stakingChilledEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.Kicked:
        const stakingKickedEvent = getStakingKickedEvent(ctx, network);

        data.nominator = await getOrCreateNominator(ctx, stakingKickedEvent.nominator, symbol, network);
        data.stash = await getOrCreateStash(ctx, stakingKickedEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.PayoutStarted:
        const stakingPayoutStartedEvent = getStakingPayoutStartedEvent(ctx, network);

        data.stash = await getOrCreateStash(ctx, stakingPayoutStartedEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.Rewarded:
        const stakingRewardedEvent = getStakingRewardedEvent(ctx, network);

        data.amount = stakingRewardedEvent.amount;
        data.stash = await getOrCreateStash(ctx, stakingRewardedEvent.stash, symbol, network);

        break;

      case SubstrateStakingActionType.Slashed:
        const stakingSlashedEvent = getStakingSlashedEvent(ctx, network);

        data.amount = stakingSlashedEvent.amount;
        data.validator = await getOrCreateStash(ctx, stakingSlashedEvent.validator, symbol, network);

        break;

      default: {
        throw new Error('getStakingEvent::method not supported');
      }
    }

    if (!data.nominator) {
      data.nominator = await getOrCreateNominator(ctx, account, symbol, network);
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

async function getOrCreateNominator(ctx: EventHandlerContext, account: string, symbol: string, network: SubstrateNetwork) {
  const nominator = await getOrCreate(
    ctx.store,
    SubstrateStakingNominatorAccount,
    {
      id: `${account}:${symbol}`,
      account: account,
      rootAccount: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(nominator);
  return nominator;
}

async function getOrCreateValidator(ctx: EventHandlerContext, account: string, symbol: string, network: SubstrateNetwork) {
  const validator = await getOrCreate(
    ctx.store,
    SubstrateStakingValidatorAccount,
    {
      id: `${account}:${symbol}`,
      account: account,
      rootAccount: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(validator);
  return validator;
}

async function getOrCreateStash(ctx: EventHandlerContext, account: string, symbol: string, network: SubstrateNetwork) {
  const stash = await getOrCreate(
    ctx.store,
    SubstrateStakingStashAccount,
    {
      id: `${account}:${symbol}`,
      account: account,
      rootAccount: decodeAddress(account),
      network,
    }
  );

  await ctx.store.save(stash);
  return stash;
}

