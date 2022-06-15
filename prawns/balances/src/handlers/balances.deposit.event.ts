import { EventHandlerContext } from '@subsquid/substrate-processor';
import {decodeAddress, getRegistry, getOrCreate, encodeAddress} from '../utils';
import {
  SubstrateBalanceAccount, SubstrateBalanceDeposit,
  SubstrateNetwork,
  SubstrateTreasuryDeposit,
} from '../model';
import { getBalancesDepositEvent } from './typeGetters/getBalancesEvents';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const depositor = ctx.extrinsic?.signer;
    if (!depositor) return;

    const rootAccount = decodeAddress(depositor);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const {who: depositee, amount} = getBalancesDepositEvent(ctx, network);
    // receiver
    const toAccount = encodeAddress(network, depositee);
    const rootToAccount = decodeAddress(depositee);

    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];

    const balanceAccountDepositor = await getOrCreate(
      ctx.store,
      SubstrateBalanceAccount,
      {
        id: `${depositor}:${symbol}`,
        network,
        symbol,
        decimals,
        rootAccount,
        account: depositor,
        balance: 0n,
        totalTransfers: 0,
      }
    );
    balanceAccountDepositor.balance -= amount;

    const balanceAccountDepositee = await getOrCreate(
      ctx.store,
      SubstrateBalanceAccount,
      {
        id: `${toAccount}:${symbol}`,
        network,
        symbol,
        decimals,
        rootAccount: rootToAccount,
        account: toAccount,
        balance: 0n,
        totalTransfers: 0,
      }
    );
    balanceAccountDepositee.balance += amount;

    await ctx.store.save([balanceAccountDepositor, balanceAccountDepositee]);

    const depositModel = new SubstrateBalanceDeposit({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      amount,
      depositor: balanceAccountDepositor,
      depositee: balanceAccountDepositee,
    });

    await ctx.store.save(depositModel);
  };
