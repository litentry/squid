import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateStakingActionType, SubstrateStakingNominatorAccount } from '../model';
import { decodeAddress, getOrCreate, getRegistry } from '../utils';
import { createStakingActionHistory } from '../utils/staking';
import { getStakingBondedEvent } from './typeGetters/getStakingBondedEvent';

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

    const stakingEvent = getStakingBondedEvent(ctx, network);

    // const proxyCallArgs = getFieldByNameFromExtrinsicArgs(extrinsic.args, 'call') || getFieldByNameFromExtrinsicArgs(extrinsic.args, 'calls');
    // const [controller, stash, amount] = [
    //   proxyCallArgs?.args?.controller || getFieldByNameFromExtrinsicArgs(extrinsic.args, 'controller') as string,
    //   stakingEvent.stash,
    //   stakingEvent.amount,
    // ];

    const nominator = await getOrCreate(
      ctx.store,
      SubstrateStakingNominatorAccount,
      {
        id: `${account}:${symbol}`,
        account,
        rootAccount,
        network,
      }
    );

    await ctx.store.save(nominator);

    return await createStakingActionHistory(
      ctx.store,
      network,
      blockNumber,
      ctx.event.indexInBlock,
      action,
      date,
      stakingEvent.amount || BigInt(0),
      nominator,
    );
  };

