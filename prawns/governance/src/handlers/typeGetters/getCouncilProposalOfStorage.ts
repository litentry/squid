import { SubstrateNetwork } from '../../model';
import { CouncilProposalOfStorage as KusamaCouncilProposalOfStorage } from '../../types/kusama/storage';
import { CouncilProposalOfStorage as PolkadotCouncilProposalOfStorage } from '../../types/polkadot/storage';
import { CouncilProposalOfStorage as KhalaCouncilProposalOfStorage } from '../../types/khala/storage';
import {StorageContext} from "@subsquid/substrate-typegen/lib/support";

export async function getCouncilProposalOfStorage(
  ctx: StorageContext,
  network: SubstrateNetwork,
  proposalHash: Uint8Array
): Promise<{__kind?: string, value?: {__kind?: string, proposalId?: number}}| undefined> {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const call = new KusamaCouncilProposalOfStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9122) {
        return await call.getAsV9122(proposalHash);
      }

      if (call.isV9130) {
        return await call.getAsV9130(proposalHash);
      }

      if (call.isV9111) {
        return await  call.getAsV9111(proposalHash);
      }

      if (call.isV9160) {
        return await call.getAsV9160(proposalHash);
      }

      if (call.isV9170) {
        return await call.getAsV9170(proposalHash);
      }

      if (call.isV9180) {
        return await call.getAsV9180(proposalHash);
      }

      if (call.isV9190) {
        return await call.getAsV9190(proposalHash);
      }

      if (call.isV9220) {
        return await call.getAsV9220(proposalHash);
      }

      if (call.isV9230) {
        return await call.getAsV9230(proposalHash);
      }

      throw new Error("Unexpected version");
    }

    case SubstrateNetwork.polkadot: {
      const call = new PolkadotCouncilProposalOfStorage(ctx);
      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9220) {
        return await call.getAsV9220(proposalHash);
      }

      if (call.isV9190) {
        return await call.getAsV9190(proposalHash);
      }

      if (call.isV9180) {
        return await call.getAsV9180(proposalHash);
      }

      if (call.isV9170) {
        return await call.getAsV9170(proposalHash);
      }

      if (call.isV9140) {
        return await call.getAsV9140(proposalHash);
      }

      if (call.isV9110) {
        return await call.getAsV9110(proposalHash);
      }

      if (call.isV9230) {
        return await call.getAsV9230(proposalHash);
      }

      throw new Error("Unexpected version");
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaCouncilProposalOfStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV1100) {
       return call.getAsV1100(proposalHash);
     }
      if (call.isV1110) {
        return call.getAsV1110(proposalHash);
      }
      if (call.isV1120) {
        return call.getAsV1120(proposalHash);
      }
      if (call.isV1130) {
        return call.getAsV1130(proposalHash);
      }
      if (call.isV1140) {
        return call.getAsV1140(proposalHash);
      }
      if (call.isV1150) {
        return call.getAsV1150(proposalHash);
      }
      if (call.isV1090) {
        return call.getAsV1090(proposalHash);
      }
      if (call.isV1091) {
        return call.getAsV1091(proposalHash);
      }
      if (call.isV1160) {
        return call.getAsV1160(proposalHash);
      }

      throw new Error("Unexpected version");
    }

    default: {
      throw new Error('getCouncilProposalOfStorage::network not supported');
    }
  }
}
