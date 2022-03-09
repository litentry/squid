import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import { SubstrateIdentity, SubstrateNetwork } from '../model';
import { getIdentitySetIdentityCall } from './typeGetters/getIndentitySetIdentityCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const identity = getIdentitySetIdentityCall(ctx);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.event.indexInBlock}`,
      account,
      rootAccount, 
      network,
      current: true,
      blockNumber,
      date,
      display: identity.display,
      email: identity.email,
      image: identity.image,
      legal: identity.legal,
      pgp: identity.pgp,
      riot: identity.riot,
      twitter: identity.twitter,
      web: identity.web,
    });

    await ctx.store.save(identityModel);
  };
