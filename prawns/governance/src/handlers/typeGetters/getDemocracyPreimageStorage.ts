import { SubstrateNetwork } from '../../model';
import { DemocracyPreimagesStorage as PolkadotDemocracyPreimagesStorage } from '../../types/polkadot/storage';
import { DemocracyPreimagesStorage as KhalaDemocracyPreimagesStorage } from '../../types/khala/storage';
import { DemocracyPreimagesStorage as KusamaDemocracyPreimagesStorage } from '../../types/kusama/storage';
import { StorageContext } from '@subsquid/substrate-typegen/lib/support';
import { PreimageStatus_Available, PreimageStatus_Missing } from '../../types/kusama/v9111';


const getType = async (
  ctx: StorageContext,
  network: SubstrateNetwork,
  proposalHash: Uint8Array
): Promise<undefined | PreimageStatus_Available | PreimageStatus_Missing> => {
  let storage;
  switch (network) {

    case SubstrateNetwork.polkadot:
      storage = new PolkadotDemocracyPreimagesStorage(ctx);

      if (!storage.isExists) {
        return undefined;
      }

      if (storage.isV0) {
        return await storage.getAsV0(proposalHash).then(r => r?.__kind === 'Available' ? ({__kind: r.__kind, ...r.value}) : undefined);
      }

      if (storage.isV9110) {
        return await storage.getAsV9110(proposalHash);
      }

      break;

    case SubstrateNetwork.phala:

      storage = new KhalaDemocracyPreimagesStorage(ctx);

      if (!storage.isExists) {
        return undefined;
      }

      if (storage.isV1) {
        return await storage.getAsV1(proposalHash).then(r => r?.__kind === 'Available' ? ({__kind: r.__kind, ...r.value}) : undefined);
      }

      if (storage.isV1090) {
        return await storage.getAsV1090(proposalHash);
      }

      break;

    case SubstrateNetwork.kusama:

      storage = new KusamaDemocracyPreimagesStorage(ctx);

      if (!storage.isExists) {
        return undefined;
      }

      if (storage.isV1058) {
        return await storage.getAsV1058(proposalHash).then(r => r?.__kind === 'Available' ? ({__kind: r.__kind, ...r.value}) : undefined);
      }

      if (storage.isV1022) {
        const result = await storage.getAsV1022(proposalHash);
        if (!result) {
          return undefined;
        }
        const [data, provider, deposit, since] = result;
        return {
          __kind: 'Available',
          data,
          provider,
          deposit,
          since
        } as PreimageStatus_Available
      }

      if (storage.isV9111) {
        return await storage.getAsV9111(proposalHash);
      }
      break;
  }


  throw new Error('getDemocracyPreimagesStorage::network not supported');
}

export async function getDemocracyPreimagesStorage(
  ctx: StorageContext,
  network: SubstrateNetwork,
  proposalHash: Uint8Array
) {
  const storage = await getType(ctx, network, proposalHash);
  if (storage?.__kind !== 'Available') {
    return undefined;
  }

  return storage;
}
