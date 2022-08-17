import { hexToString } from '@polkadot/util';
import { Codec } from '@subsquid/scale-codec';
import {
  EventHandlerContext,
  SubstrateCall,
} from '@subsquid/substrate-processor';
import { Store } from '@subsquid/typeorm-store';

export interface TipCallArgs {
  who: string;
  reason: string;
  tipValue: bigint | null;
}

export function getMultiSigCallArgs(
  ctx: EventHandlerContext<Store>,
  call: SubstrateCall
): TipCallArgs {
  const c = new Codec(ctx._chain.description.types);
  const data = c.decodeBinary(ctx._chain.description.call, call.args.call);

  const who = data.value?.who
    ? '0x' + Buffer.from(data.value.who).toString('hex')
    : null;
  const reason = data.value?.reason
    ? Buffer.from(data.value.reason).toString()
    : null;
  const tipValue = data.value?.tipValue
    ? Buffer.from(data.value.tipValue).toString()
    : null;

  if (!who || !reason) {
    throw new Error(`Could not decode multisig call for: ${data}`);
  }

  return {
    who,
    reason,
    tipValue: tipValue ? BigInt(tipValue) : null,
  };
}

export function getArgsFromCall(
  ctx: EventHandlerContext<Store>,
  call: SubstrateCall
): TipCallArgs {
  if (call.name === 'Multisig.as_multi') {
    return getMultiSigCallArgs(ctx, call);
  }

  return {
    who: call.args.who,
    reason: hexToString(call.args.reason),
    tipValue: call.args.tipValue,
  };
}
