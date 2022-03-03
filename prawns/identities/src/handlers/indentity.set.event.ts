import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  decodeAddress,
  encodeAddress,
} from '../utils';
import {
  SubstrateIdentity,
  SubstrateNetwork,
} from '../model';
import { getIdentityIdentitySetEvent } from './typeGetters/getIndentityEvent';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const identity = getIdentityIdentitySetEvent(ctx, network);
    const account = encodeAddress(network, identity.who);
    const rootAccount = decodeAddress(identity.who);
    console.log(account);
    console.log(rootAccount);

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      account,
      rootAccount, 
      network,
      current: true,
      blockNumber,
      date,
    });

    await ctx.store.save(identityModel);
  };
