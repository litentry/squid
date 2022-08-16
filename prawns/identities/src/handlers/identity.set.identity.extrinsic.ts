import { CallHandlerContext } from '@subsquid/substrate-processor';
import { decodeAddress } from '../utils';
import {
  SubstrateIdentity,
  SubstrateNetwork,
  SubstrateIdentityAction,
} from '../model';
import { getIdentitySetIdentityCall } from './typeGetters/getIndentitySetIdentityCall';
import { Store } from '@subsquid/typeorm-store';
import getCallOriginAccount from '../utils/getCallOriginAccount';
import assert from 'assert';
import substrateIdentityRepository from '../repositories/substrateIdentityRepository';

export default (network: SubstrateNetwork) =>
  async (ctx: CallHandlerContext<Store>) => {
    const blockNumber = BigInt(ctx.block.height);
    const date = new Date(ctx.block.timestamp);
    const account = getCallOriginAccount(ctx.call.origin, network);
    assert(account);
    const publicKey = decodeAddress(account);
    const identity = getIdentitySetIdentityCall(ctx);

    const oldIdentityModels = (
      await substrateIdentityRepository.getActiveByAccount(ctx.store, account)
    ).map((activeAccount) => {
      activeAccount.current = false;
      return activeAccount;
    });

    const identityModel = new SubstrateIdentity({
      id: `${network}:${blockNumber.toString()}:${ctx.extrinsic.indexInBlock}`,
      account,
      publicKey,
      network,
      current: true, // the last set_identity call we get is the current one
      blockNumber,
      date,
      action: SubstrateIdentityAction.SET,
      ...identity,
    });

    await ctx.store.save([...oldIdentityModels, identityModel]);
  };
