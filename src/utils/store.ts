import { Store } from '@subsquid/substrate-processor';

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

type EntityConstructor<T> = {
  new (...args: any[]): T;
};
