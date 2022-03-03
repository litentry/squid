import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import {
  decodeAddress,
  encodeAddress,
} from '../utils';
import {
  SubstrateIdentity,
  SubstrateNetwork,
} from '../model';
import { getIdentitySetIdentityCall } from './typeGetters/getIndentitySetIdentityCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {

    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const identity = getIdentitySetIdentityCall(ctx, network);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);

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
      display: identity.display.toString(),
      email: identity.email.toString(),
      image: identity.image.toString(),
      legal: identity.legal.toString(),
      pgp: identity.pgp?.toString(),
      riot: identity.riot.toString(),
      twitter: identity.twitter.toString(),
      web: identity.web.toString(),
    });

    await ctx.store.save(identityModel);
  };
