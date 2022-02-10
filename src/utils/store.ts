import { Store } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';

export async function getOrCreate<T extends { id: string }>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  id: string,
  save?: boolean
): Promise<T> {
  let e = await store.get<T>(entityConstructor, {
    where: { id },
  });

  if (e == null) {
    e = new entityConstructor();
    e.id = id;

    if (save) {
      await store.save(e);
    }
  }

  return e;
}

type SubstrateAccountBaseProps = {
  id: string;
  rootAccount: string;
  network: SubstrateNetwork;
  prefix: number;
};

export async function getOrCreateAccount<T extends SubstrateAccountBaseProps>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  props: SubstrateAccountBaseProps,
  save?: boolean
): Promise<T> {
  let e = await store.get<T>(entityConstructor, {
    where: { id: props.id },
  });

  if (e == null) {
    e = new entityConstructor();
    e.id = props.id;
    e.rootAccount = props.rootAccount;
    e.network = props.network;
    e.prefix = props.prefix;

    if (save) {
      await store.save(e);
    }
  }

  return e;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
