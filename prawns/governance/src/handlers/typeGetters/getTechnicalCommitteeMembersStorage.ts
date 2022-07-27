import { SubstrateNetwork } from '../../model';
import { TechnicalCommitteeMembersStorage as KusamaTechnicalCommitteeMembersStorage } from '../../types/kusama/storage';
import { TechnicalCommitteeMembersStorage as PolkadotTechnicalCommitteeMembersStorage } from '../../types/polkadot/storage';
import { TechnicalCommitteeMembersStorage as KhalaTechnicalCommitteeMembersStorage } from '../../types/khala/storage';
import { StorageContext } from '@subsquid/substrate-typegen/lib/support';

export async function getTechnicalCommitteeMembersStorage(
  ctx: StorageContext,
  network: SubstrateNetwork
): Promise<Uint8Array[]|undefined> {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaTechnicalCommitteeMembersStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9111) {
        return await call.getAsV9111();
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotTechnicalCommitteeMembersStorage(ctx);
      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9110) {
        return await call.getAsV9110();
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaTechnicalCommitteeMembersStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV1090) {
        return call.getAsV1090();
      }
      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getTechnicalCommitteeMembersStorage::network not supported');
    }
  }
}
