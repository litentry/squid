import { Store } from '@subsquid/substrate-processor';

/**
 *
 * @param store
 * @param entityConstructor
 * @param id
 */
export async function getById<T extends { id: string }>(
  store: Store,
  entityConstructor: EntityConstructor<T>,
  id: string
): Promise<T> {
  const e = await store.get<T>(entityConstructor, {
    where: { id },
  });

  if (e == null) {
    throw new Error('Entity not found for id:' + id);
  }

  return e;
}

/**
 *
 * @param store
 * @param entityConstructor
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

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
