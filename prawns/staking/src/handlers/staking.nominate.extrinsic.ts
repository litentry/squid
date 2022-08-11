import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress as decodeAddressUtil } from '@polkadot/util-crypto';
import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateStakingValidatorAccount } from '../model';
import {
  decodeAddress,
  getOrCreate,
  getRegistry,
  encodeAddress,
} from '../utils';
import { Store } from '@subsquid/typeorm-store';
import { getStakingNominateExtrinsic } from './typeGetters/getStakingNominateExtrinsic';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: CallHandlerContext<Store>) => {
    const extrinsic = ctx.extrinsic;
    if (!extrinsic) {
      return;
    }
    const symbol = getRegistry(network).symbols[tokenIndex];
    const { targets } = getStakingNominateExtrinsic(ctx, network);

    const filteredTargets = new Set(targets.filter((target) => target));
    filteredTargets.forEach((target) => {
      if (!target) {
        return;
      }
      saveNewValidatorAccount(
        ctx,
        encodeAddress(network, target),
        symbol,
        network
      );
    });
  };

async function saveNewValidatorAccount(
  ctx: CallHandlerContext<Store>,
  target: string,
  symbol: string,
  network: SubstrateNetwork
) {
  const account = await getOrCreate(
    ctx.store,
    SubstrateStakingValidatorAccount,
    {
      id: `${target}:${symbol}`,
      account: target,
      publicKey: decodeAddress(target),
      network,
    }
  );

  try {
    await ctx.store.save(account);
  } catch (error) {
    // Swallow the error in case it exists.
  }
}
