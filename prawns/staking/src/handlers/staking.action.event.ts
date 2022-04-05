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

        const bondedStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingBondedEvent.stash}:${symbol}`,
            account: stakingBondedEvent.stash,
            rootAccount: decodeAddress(stakingBondedEvent.stash),
            network,
          }
        );

        await ctx.store.save(bondedStash);

        data.stash = bondedStash;
        data.amount = stakingBondedEvent.amount;

        break;

      case SubstrateStakingActionType.Unbonded:
        const stakingUnbondedEvent = getStakingUnbondedEvent(ctx, network);

        const unbondedStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingUnbondedEvent.stash}:${symbol}`,
            account: stakingUnbondedEvent.stash,
            rootAccount: decodeAddress(stakingUnbondedEvent.stash),
            network,
          }
        );

        await ctx.store.save(unbondedStash);

        data.amount = stakingUnbondedEvent.amount;
        data.stash = unbondedStash;

        break;

      case SubstrateStakingActionType.Chilled:
        const stakingChilledEvent = getStakingChilledEvent(ctx, network);

        const chilledStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingChilledEvent.stash}:${symbol}`,
            account: stakingChilledEvent.stash,
            rootAccount: decodeAddress(stakingChilledEvent.stash),
            network,
          }
        );

        await ctx.store.save(chilledStash);

        data.stash = chilledStash;

        break;

      case SubstrateStakingActionType.Kicked:
        const stakingKickedEvent = getStakingKickedEvent(ctx, network);

        const kickedNominator = await getOrCreate(
          ctx.store,
          SubstrateStakingNominatorAccount,
          {
            id: `${stakingKickedEvent.nominator}:${symbol}`,
            account: stakingKickedEvent.nominator,
            rootAccount: decodeAddress(stakingKickedEvent.nominator),
            network,
          }
        );

        await ctx.store.save(kickedNominator);

        const kickedStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingKickedEvent.stash}:${symbol}`,
            account: stakingKickedEvent.stash,
            rootAccount: decodeAddress(stakingKickedEvent.stash),
            network,
          }
        );

        await ctx.store.save(kickedStash);

        data.nominator = kickedNominator;
        data.stash = kickedStash;

        break;

      case SubstrateStakingActionType.PayoutStarted:
        const stakingPayoutStartedEvent = getStakingPayoutStartedEvent(ctx, network);

        const payoutStartedStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingPayoutStartedEvent.stash}:${symbol}`,
            account: stakingPayoutStartedEvent.stash,
            rootAccount: decodeAddress(stakingPayoutStartedEvent.stash),
            network,
          }
        );

        await ctx.store.save(payoutStartedStash);

        data.stash = payoutStartedStash;

        break;

      case SubstrateStakingActionType.Rewarded:
        const stakingRewardedEvent = getStakingRewardedEvent(ctx, network);

        const rewardedStash = await getOrCreate(
          ctx.store,
          SubstrateStakingStashAccount,
          {
            id: `${stakingRewardedEvent.stash}:${symbol}`,
            account: stakingRewardedEvent.stash,
            rootAccount: decodeAddress(stakingRewardedEvent.stash),
            network,
          }
        );

        await ctx.store.save(rewardedStash);

        data.amount = stakingRewardedEvent.amount;
        data.stash = rewardedStash;

        break;

      case SubstrateStakingActionType.Slashed:
        const stakingSlashedEvent = getStakingSlashedEvent(ctx, network);

        const slashedValidator = await getOrCreate(
          ctx.store,
          SubstrateStakingValidatorAccount,
          {
            id: `${stakingSlashedEvent.validator}:${symbol}`,
            account: stakingSlashedEvent.validator,
            rootAccount: decodeAddress(stakingSlashedEvent.validator),
            network,
          }
        );

        await ctx.store.save(slashedValidator);

        data.amount = stakingSlashedEvent.amount;
        data.validator = slashedValidator;

        break;

      default: {
        throw new Error('getStakingEvent::method not supported');
      }
    }

    // const proxyCallArgs = getFieldByNameFromExtrinsicArgs(extrinsic.args, 'call') || getFieldByNameFromExtrinsicArgs(extrinsic.args, 'calls');
    // const [controller, stash, amount] = [
    //   proxyCallArgs?.args?.controller || getFieldByNameFromExtrinsicArgs(extrinsic.args, 'controller') as string,
    //   stakingEvent.stash,
    //   stakingEvent.amount,
    // ];

    if (!data.nominator) {
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

      data.nominator = nominator;
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

