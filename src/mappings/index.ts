import { EventContext, StoreContext } from '@subsquid/hydra-common';
import { u8aToString } from '@polkadot/util';
import { Identity } from '../generated/model';
import { Identity as I } from '../types';
import getOrCreate from '../utils/getOrCreate';
import getApi from '../utils/getApi';

export async function handleIdentitySet({
  store,
  event,
}: EventContext & StoreContext) {
  const [account] = new I.IdentitySetEvent(event).params
  const identity = await getOrCreate<Identity>(
    store,
    Identity,
    `${event.blockNumber}-${event.id}`
  );

  const api = await getApi();
  const chainData = await api.query.identity.identityOf(
    event.params[0].value as string
  );
  const upwrapped = chainData.unwrapOr(null);

  if (!upwrapped) {
    return;
  }

  // identity.judgements = upwrapped.judgements.map((judgement) => ({
  //   registrarIndex: judgement[0].toNumber(),
  //   judgement: judgement[1].toString(),
  // }));

  identity.deposit = upwrapped.deposit.toBigInt();
  identity.display = u8aToString(upwrapped.info.display.asRaw);
  identity.email = u8aToString(upwrapped.info.email.asRaw);
  identity.image = u8aToString(upwrapped.info.image.asRaw);
  identity.legal = u8aToString(upwrapped.info.legal.asRaw);
  identity.pgpFingerprint = upwrapped.info.pgpFingerprint.toString(); // not sure what this is
  identity.riot = u8aToString(upwrapped.info.riot.asRaw);
  identity.twitter = u8aToString(upwrapped.info.twitter.asRaw);
  identity.web = u8aToString(upwrapped.info.web.asRaw);
  identity.additional = upwrapped.info.additional.map((item:any) =>
    item.toString()
  );

  identity.address=account.toHuman()

  store.save<Identity>(identity);
}
