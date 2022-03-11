import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateIdentity, SubstrateNetwork } from '../model';
import { getIdentitySetIdentityCall } from './typeGetters/getIndentitySetIdentityCall';
import { getManager } from 'typeorm';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const identity = getIdentitySetIdentityCall(ctx);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);

    const entityManager = getManager();
    // We updated all other instances of the identity associated with that account to signal that they are not the latest and active one.
    await entityManager.update(SubstrateIdentity, { account, current: true }, { current: false });

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      account,
      rootAccount, 
      network,
      current: true, // the last set_identity call we get is the current one
      blockNumber,
      date,
      ...identity,
    });

    await ctx.store.save(identityModel);
  };
