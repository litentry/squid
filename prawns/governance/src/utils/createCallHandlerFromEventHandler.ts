import {
  CallHandlerContext,
  EventHandlerContext,
} from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

export function createCallHandlerFromEventHandler(
  ctx: EventHandlerContext<Store>
): CallHandlerContext<Store> | undefined {
  if (!ctx.event.call) {
    return;
  }

  return {
    ...ctx,
    call: ctx.event.call,
    extrinsic: ctx.event.extrinsic,
  };
}
