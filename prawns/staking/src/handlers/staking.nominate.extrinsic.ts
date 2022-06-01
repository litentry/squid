import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress as decodeAddressUtil, encodeAddress } from '@polkadot/util-crypto';
import { ExtrinsicArg, ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateStakingValidatorAccount } from '../model';
import { decodeAddress, getOrCreate, getRegistry } from '../utils';

export default (network: SubstrateNetwork, tokenIndex: number) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const extrinsic = ctx.extrinsic;
    if (!extrinsic) {
      return;
    }

    const symbol = getRegistry(network).symbols[tokenIndex];

    const targets = getFieldFromExtrinsicArgs(extrinsic.args, 'targets') as string[];
    if (!targets) {
      return;
    }

    const filteredTargets = (new Set(targets.filter(target => isValidAddress(target))));
    filteredTargets.forEach((target: string) => {
      saveNewValidatorAccount(ctx, target, symbol, network);
    });

};


async function saveNewValidatorAccount(ctx: ExtrinsicHandlerContext, target: string, symbol: string, network: SubstrateNetwork) {
  const account = await getOrCreate(
    ctx.store,
    SubstrateStakingValidatorAccount,
    {
      id: `${target}:${symbol}`,
      account: target,
      rootAccount: decodeAddress(target),
      network,
    }
  );

  try {
    await ctx.store.save(account);
  }  catch (error) {
    // Swallow the error in case it exists.
  }
}

function getFieldFromExtrinsicArgs(args: ExtrinsicArg[], name: string): any {
  return (args.find(arg => arg.name === name))?.value;
}

function isValidAddress(target: string): boolean {
  try {
    encodeAddress(
      isHex(target)
        ? hexToU8a(target)
        : decodeAddressUtil(target)
    );

    return target.length>46;
  } catch (error) {
    return false;
  }
}
