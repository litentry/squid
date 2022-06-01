import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { hexToString } from '@polkadot/util';

interface IdentityInfo {
  display: (string | null)
  legal: (string | null)
  web: (string | null)
  riot: (string | null)
  email: (string | null)
  pgp: (string | null)
  image: (string | null)
  twitter: (string | null)
}

export function getIdentitySetIdentityCall(
  ctx: ExtrinsicHandlerContext,
): IdentityInfo {
  const info = ctx.extrinsic.args[0].value as any;
  return {
    display: info.display?.raw ? hexToString(info.display.raw) : null,
    email: info.email?.raw ? hexToString(info.email.raw) : null,
    image: info.image?.raw ? hexToString(info.image.raw) : null,
    legal: info.legal?.raw ? hexToString(info.legal.raw) : null,
    pgp: info.pgp?.toString() ?? undefined,
    riot: info.riot?.raw ? hexToString(info.riot.raw) : null,
    twitter: info.twitter?.raw ? hexToString(info.twitter.raw) : null,
    web: info.web?.raw ? hexToString(info.web.raw) : null,
  }
}
