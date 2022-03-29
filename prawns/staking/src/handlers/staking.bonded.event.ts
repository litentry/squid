import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import { decodeAddress } from '../utils';
import { getStakingBondedEvent } from './typeGetters/getStakingBondedEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {

    const account = ctx.extrinsic?.signer;
    if (!account) return;

    const rootAccount = decodeAddress(account);
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const staking = getStakingBondedEvent(ctx, network);

    console.log({
      account,
      ...staking
    });
  };
