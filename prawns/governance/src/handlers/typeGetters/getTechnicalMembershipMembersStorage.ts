import { SubstrateNetwork } from '../../model';
import { TechnicalMembershipMembersStorage as KusamaTechnicalMembershipMembersStorage } from '../../types/kusama/storage';
import { TechnicalMembershipMembersStorage as PolkadotTechnicalMembershipMembersStorage } from '../../types/polkadot/storage';
import { TechnicalMembershipMembersStorage as KhalaTechnicalMembershipMembersStorage } from '../../types/khala/storage';
import { StorageContext } from '@subsquid/substrate-typegen/lib/support';

export async function getTechnicalMembershipMembersStorage(
  ctx: StorageContext,
  network: SubstrateNetwork
): Promise<Uint8Array[]|undefined> {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaTechnicalMembershipMembersStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9111) {
        return await call.getAsV9111();
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotTechnicalMembershipMembersStorage(ctx);
      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9110) {
        return await call.getAsV9110();
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaTechnicalMembershipMembersStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV1090) {
        return call.getAsV1090();
      }
      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTechnicalMembershipMembersStorage::network not supported');
    }
  }
}
