import { Store } from '@subsquid/typeorm-store';
import { FindOptionsWhere } from 'typeorm';

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
  let e = await store.findOneBy(entityConstructor, {
    id: props.id,
  } as FindOptionsWhere<T>);

  if (e == null) {
    e = new entityConstructor(props);
  }

  return e;
}

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
