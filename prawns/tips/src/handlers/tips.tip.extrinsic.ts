import { ApiDecoration } from '@polkadot/api/types';
import type { OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import { u8aToHex } from '@polkadot/util';
import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip, SubstrateTipper } from '../model';
import { decodeAddress } from '../utils';
import getApi from '../utils/getApi';
import { getTipsTipCall } from './typeGetters/getTipsTipCall';

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const tipCall = getTipsTipCall(ctx, network);
    const blockNumber = BigInt(ctx.block.height);
    const account = ctx.extrinsic.signer;
    const rootAccount = decodeAddress(account);
    const date = new Date(ctx.block.timestamp);

    const tipModel = await ctx.store.get(SubstrateTip, u8aToHex(tipCall.hash));
    if (!tipModel) {
      throw new Error('tips.tip.extrinsic::Tip not found: ');
    }

    if (!tipModel.closes) {
      const blockHash = ctx.block.hash;
      const api = await getApi(network);
      const apiAtBlock = await api.at(blockHash);
      const closes = await getClosesTipData(apiAtBlock, tipCall.hash);

      if (closes) {
        await ctx.store.update(SubstrateTip, u8aToHex(tipCall.hash), { closes });
      }
    }

    const tipperModel = new SubstrateTipper({
      id: `${account}:${u8aToHex(tipCall.hash)}`,
      account,
      rootAccount, 
      network,
      blockNumber,
      createdAt: date,
      tip: tipModel,
      tipValue: tipCall.tipValue,
    });

    await ctx.store.save(tipperModel);
  };

  async function getClosesTipData(apiAtBlock: ApiDecoration<"promise">, hash: Uint8Array): Promise<bigint | null> {
    const tipOption = await apiAtBlock.query.tips.tips(hash);
    const tip = tipOption.unwrap() as PalletTipsOpenTip | OpenTipTo225;
  
    return tip.closes?.unwrapOr(null)?.toBigInt() || null;
  }

