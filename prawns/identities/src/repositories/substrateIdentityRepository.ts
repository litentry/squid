import { SubstrateIdentity } from '../model';
import { Store } from '@subsquid/typeorm-store';

const getActiveByAccount = async (store: Store, account: string) => {
  return store.findBy(SubstrateIdentity, {
    account,
    current: true,
  }) as unknown as SubstrateIdentity[];
};

export default {
  getActiveByAccount,
};
