import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import { SubstrateStakingStashAccount } from '../model/generated/substrateStakingStashAccount.model';
import { decodeAddress, getOrCreate, getRegistry } from '../utils';
import { getFieldByNameFromExtrinsicArgs } from '../utils/extrinsics';
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

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const extrinsic = ctx.extrinsic;
    if (!extrinsic) {
      return;
    }

    console.log(ctx.event.params);
    console.log(extrinsic);

    const account = extrinsic.signer;
    const rootAccount = decodeAddress(account);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const stakingEvent = getStakingBondedEvent(ctx, network);
    const symbol = getRegistry(network).symbols[tokenIndex];

    const proxyCallArgs = getFieldByNameFromExtrinsicArgs(extrinsic.args, 'calls');

    // if (!getFieldByNameFromExtrinsicArgs(extrinsic.args, 'controller')) {
    //   console.log(blockNumber);
    //   console.log(proxyCallArgs);
    //   console.log(extrinsic.args, 'args');
    //   // console.log(controller);
    //   // console.log(stash);
    //   // console.log(amount);
    //   console.log('#################');
    // }

    const [controller, stash, amount] = [
      proxyCallArgs?.args?.controller || getFieldByNameFromExtrinsicArgs(extrinsic.args, 'controller') as string,
      stakingEvent.stash,
      stakingEvent.amount,
    ];

    const stashAccount = await getOrCreate(
      ctx.store,
      SubstrateStakingStashAccount,
      {
        id: `${stash}:${symbol}`,
        account: stash,
        rootAccount: decodeAddress(stash),
        balance: BigInt(0),
      }
    );

  };

