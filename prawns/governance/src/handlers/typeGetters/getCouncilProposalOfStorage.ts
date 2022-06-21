import { SubstrateNetwork } from '../../model';
import { CouncilProposalOfStorage as KusamaCouncilProposalOfStorage } from '../../types/kusama/storage';
import { CouncilProposalOfStorage as PolkadotCouncilProposalOfStorage } from '../../types/polkadot/storage';
import { CouncilProposalOfStorage as KhalaCouncilProposalOfStorage } from '../../types/polkadot/storage';
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
        return await call.getAsV9170(proposalHash);
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

      throw new Error("Unexpected version");
    }

    case SubstrateNetwork.phala: {
      const call = new KhalaCouncilProposalOfStorage(ctx);

      if (!call.isExists) {
        return undefined;
      }

      if (call.isV9110) {
        return await call.getAsV9110(proposalHash);
      }

      if (call.isV9140) {
        return await call.getAsV9140(proposalHash);
      }

      if (call.isV9170) {
        return await call.getAsV9170(proposalHash);
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

      throw new Error("Unexpected version");

    }

    default: {
      throw new Error('getCouncilProposalOfStorage::network not supported');
    }
  }
}
