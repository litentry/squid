import { EventHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress, getRegistry, getOrCreate } from 'prawn-utils';
import {
  SubstrateBalanceAccount,
  SubstrateNetwork,
  SubstrateTreasuryDeposit,
} from '../model';
import { getTreasuryDepositEvent } from './typeGetters/getTreasuryEvents';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: EventHandlerContext) => {
    const depositor = ctx.extrinsic?.signer;
    if (!depositor) return;

    const rootAccount = decodeAddress(depositor);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const deposit = getTreasuryDepositEvent(ctx, network);
    const symbol = getRegistry(network).symbols[tokenIndex];
    const decimals = getRegistry(network).decimals[tokenIndex];

    const balanceAccount = await getOrCreate(
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
    balanceAccount.balance -= deposit;
    await ctx.store.save(balanceAccount);

    const depositModel = new SubstrateTreasuryDeposit({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      network,
      blockNumber,
      date,
      symbol,
      decimals,
      accountBalanceAtBlock: balanceAccount.balance,
      amount: deposit,
      depositor: balanceAccount,
    });

    await ctx.store.save(depositModel);
  };
