import { ApiDecoration } from '@polkadot/api/types';
import type { OpenTipTo225 } from '@polkadot/types/interfaces';
import type { PalletTipsOpenTip } from '@polkadot/types/lookup';
import {
  EventHandlerContext,
  SubstrateCall,
} from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';
import { SubstrateNetwork, SubstrateTip, SubstrateTipStatus } from '../model';
import getApi from '../utils/getApi';

enum NAMES {
  TipClosed = 'Tips.TipClosed',
  TipClosing = 'Tips.TipClosing',
  TipRetracted = 'Tips.TipRetracted',
  TipSlashed = 'Tips.TipSlashed',
}

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext<Store>) => {
    if (!ctx.event || !ctx.event.call) {
      return;
    }

    if (ctx.event.call?.name === 'Utility.batch') {
      return await handleBatchCall(ctx, ctx.event.call, network);
    }

    return await handleSingleCall(ctx, ctx.event.call, network);
  };

async function handleBatchCall(
  ctx: EventHandlerContext<Store>,
  call: SubstrateCall,
  network: SubstrateNetwork
) {
  const date = new Date(ctx.block.timestamp);

  const tipModels = await Promise.all(
    call.args.calls.map(
      async (innerCall: any): Promise<SubstrateTip | undefined> => {
        const hash = innerCall.value.hash;
        if (!hash) {
          ctx.log.info(`tips.status.event::No hash argument found`);
          return;
        }

        const tipModel = await ctx.store.get(SubstrateTip, hash);
        if (!tipModel) {
          // NOTE: We don't break here because there can be old tippers or tips that are created through the treasury.NewTip.
          // For now we don't need to index those events.
          ctx.log.info(`tips.status.event::Tip not found: ${hash}`);
          return;
        }

        return await updateTip(ctx, network, tipModel, hash, date);
      }
    )
  );

  ctx.store.save(tipModels.filter((item) => !!item));
}

async function handleSingleCall(
  ctx: EventHandlerContext<Store>,
  call: SubstrateCall,
  network: SubstrateNetwork
) {
  const date = new Date(ctx.block.timestamp);
  const hash = call.args.hash as string;

  if (!hash) {
    ctx.log.info(`tips.status.event::No hash argument found`);
    return;
  }

  const tipModel = await ctx.store.get(SubstrateTip, hash);
  if (!tipModel) {
    // NOTE: We don't break here because there can be old tippers or tips that are created through the treasury.NewTip.
    // For now we don't need to index those events.
    ctx.log.info(`tips.status.event::Tip not found: ${hash}`);
    return;
  }

  const updatedTipModel = await updateTip(ctx, network, tipModel, hash, date);
  ctx.store.save(updatedTipModel);
}

async function updateTip(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork,
  tipModel: SubstrateTip,
  hash: string,
  date: Date
): Promise<SubstrateTip> {
  // ctx.log.info(ctx.event.name);
  switch (ctx.event.name) {
    case NAMES.TipClosed:
      tipModel.status = SubstrateTipStatus.Closed;
    case NAMES.TipRetracted:
      tipModel.status = SubstrateTipStatus.Retracted;
    case NAMES.TipSlashed:
      tipModel.status = SubstrateTipStatus.Slashed;
    case NAMES.TipClosing:
      const blockHash = ctx.block.hash;
      const api = await getApi(network);
      const apiAtBlock = await api.at(blockHash);
      const closes = await getClosesTipData(apiAtBlock, hash);
      tipModel.closes = closes;
  }

  tipModel.updatedAt = date;
  return tipModel;
}

async function getClosesTipData(
  apiAtBlock: ApiDecoration<'promise'>,
  hash: string
): Promise<bigint | null> {
  const tipOption = await apiAtBlock.query.tips?.tips(hash);
  if (!tipOption || tipOption.isEmpty) {
    return null;
  }
  const tip = tipOption.unwrap() as PalletTipsOpenTip | OpenTipTo225;

  return tip.closes?.unwrapOr(null)?.toBigInt() || null;
}
