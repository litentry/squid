import { Store } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';

/**
 *
 * @param store
 * @param entityConstructor
 * @param id
 * @param props only used for new entities
 */
export async function getOrCreate<T extends { id: string }>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  props: Partial<T> & { id: string }
): Promise<T> {
  let e = await store.get<T>(entityConstructor, {
    where: { id: props.id },
  });

  if (e == null) {
    e = new entityConstructor(props);
  }

  return e;
}

type SubstrateAccountBaseProps = {
  id: string;
  rootAccount: string;
  network: SubstrateNetwork;
  prefix: number;
};

/**
 * Just like getOrCreate but with typed props to ensure new accounts are created
 * with the correct data
 */
export async function getOrCreateAccount<T extends SubstrateAccountBaseProps>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  props: SubstrateAccountBaseProps
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
  }

  return e;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
