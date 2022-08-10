import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

import {
  SubstrateIdentity,
  SubstrateIdentityAction,
  SubstrateNetwork,
} from '../model';
import { encodeAddress } from '../utils';
import { getIdentitySetIdentityCall } from './typeGetters/getIndentitySetIdentityCall';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const identity = getIdentitySetIdentityCall(ctx);
    const rootAccount = ctx.extrinsic.signature?.address.value;
    if (rootAccount !== undefined) {
      ctx.log.info(rootAccount);
      // ctx.log.info('leaving', ctx.extrinsic);
      // ctx.log.info(ctx.extrinsic);
      return;
    }

    const account = encodeAddress(network, rootAccount);

    const oldIdentity = await ctx.store.findOneBy(SubstrateIdentity, {
      account,
      current: true,
    });
    if (oldIdentity !== undefined) {
      oldIdentity.current = false;
      ctx.store.save(oldIdentity);
    }

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      account,
      rootAccount,
      network,
      current: true, // the last set_identity call we get is the current one
      blockNumber,
      date,
      action: SubstrateIdentityAction.SET,
      ...identity,
    });

    await ctx.store.save(identityModel);
  };
