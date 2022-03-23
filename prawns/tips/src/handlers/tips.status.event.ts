import { ApiDecoration } from '@polkadot/api/types';
import type { OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork, SubstrateTip } from '../model';
import { SubstrateTipStatus } from '../model/generated/_substrateTipStatus';
import getApi from '../utils/getApi';

enum METHODS {
  TipClosed = 'TipClosed',
  TipClosing = 'TipClosing',
  TipRetracted = 'TipRetracted',
  TipSlashed = 'TiTipSlashedpClosed'
}

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    const date = new Date(ctx.block.timestamp);
    const hash = ctx.event.params[0].value as string;

    const tipModel = await ctx.store.get(SubstrateTip, hash);
    if (!tipModel) {
      // NOTE: We don't break here because there can be old tippers or tips that are created through the treasury.NewTip.
      // For now we don't need to index those events.
      return;
    }

    await updateTip(ctx, network, hash, date);
  };

async function updateTip(ctx: EventHandlerContext, network: SubstrateNetwork, hash: string, date: Date) {
  switch (ctx.event.method) {
    case METHODS.TipClosed:
      return await ctx.store.update(SubstrateTip, hash, {
        status: SubstrateTipStatus.Closed,
        updatedAt: date,
      });

    case METHODS.TipRetracted:
      return await ctx.store.update(SubstrateTip, hash, {
        status: SubstrateTipStatus.Retracted,
        updatedAt: date,
      });

    case METHODS.TipSlashed:
      return await ctx.store.update(SubstrateTip, hash, {
        status: SubstrateTipStatus.Slashed,
        updatedAt: date,
      });

    case METHODS.TipClosing:
      const blockHash = ctx.block.hash;
      const api = await getApi(network);
      const apiAtBlock = await api.at(blockHash);
      const closes = await getClosesTipData(apiAtBlock, hash);

      return await ctx.store.update(SubstrateTip, hash, {
        updatedAt: date,
        closes,
      });
  }
}

async function getClosesTipData(apiAtBlock: ApiDecoration<"promise">, hash: string): Promise<bigint | null> {
  const tipOption = await apiAtBlock.query.tips.tips(hash);
  const tip = tipOption.unwrap() as PalletTipsOpenTip | OpenTipTo225;

  return tip.closes?.unwrapOr(null)?.toBigInt() || null;
}

