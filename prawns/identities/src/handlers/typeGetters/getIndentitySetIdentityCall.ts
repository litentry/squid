import { CallHandlerContext } from '@subsquid/substrate-processor';
import { hexToString } from '@polkadot/util';
import { Store } from '@subsquid/typeorm-store';

interface IdentityInfo {
  display: string | null;
  legal: string | null;
  web: string | null;
  riot: string | null;
  email: string | null;
  pgp: string | null;
  image: string | null;
  twitter: string | null;
}

export function getIdentitySetIdentityCall(
  ctx: CallHandlerContext<Store>
): IdentityInfo {
  const { info } = ctx.call.args as any;
  return {
    display: info.display?.value ? hexToString(info.display.value) : null,
    email: info.email?.raw ? hexToString(info.email.value) : null,
    image: info.image?.value ? hexToString(info.image.value) : null,
    legal: info.legal?.value ? hexToString(info.legal.value) : null,
    pgp: info.pgp?.toString() ?? undefined,
    riot: info.riot?.value ? hexToString(info.riot.value) : null,
    twitter: info.twitter?.value ? hexToString(info.twitter.value) : null,
    web: info.web?.value ? hexToString(info.web.value) : null,
  };
}
