import { CallHandlerContext } from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { getManager } from 'typeorm';
import {
  SubstrateIdentity,
  SubstrateIdentityAction,
  SubstrateNetwork,
} from '../model';
import { decodeAddress } from '../utils';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const account = ctx.extrinsic.signature?.address;
    if (!account) {
      throw new Error('No Address on extrinsic.');
    }
    const rootAccount = decodeAddress(account);

    const entityManager = getManager();
    // We updated all other instances of the identity associated with that account to signal that they are not the latest and active one.
    await entityManager.update(
      SubstrateIdentity,
      { account, current: true },
      { current: false }
    );

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      account,
      rootAccount,
      network,
      current: true, // the last set_identity call we get is the current one
      blockNumber,
      date,
      action: SubstrateIdentityAction.CLEAR,
    });

    await ctx.store.save(identityModel);
  };
