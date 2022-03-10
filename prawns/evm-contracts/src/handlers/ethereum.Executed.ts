import { EventHandlerContext } from '@subsquid/substrate-processor';
import {
  SubstrateNetwork,
  SubstrateEvmContract,
  SubstrateEvmContractSignature,
} from '../model';
import {
  getContractType,
  isContractCreationInput,
  getContractData,
} from '../evm-lib';

export default (network: SubstrateNetwork) =>
  async (ctx: EventHandlerContext) => {
    if (!ctx.event.extrinsic) return;

    const { input } = ctx.event.extrinsic.args[0].value as any;
    if (!input || !isContractCreationInput(input)) return;

    const creator = ctx.event.params[0].value as string;
    const contractAddress = ctx.event.params[1].value as string;
    const evmTxHash = ctx.event.params[2].value as string;

    const { events, functions, unknownHashes } = getContractData(input);

    const functionNames = functions
      .filter((func) => func.name)
      .map((func) => func.name) as string[];
    const type = getContractType(functionNames);

    const contract = new SubstrateEvmContract({
      id: contractAddress,
      type,
      creator,
      evmTxHash,
      network,
    });
    await ctx.store.save(contract);

    await ctx.store.save(
      events.map(
        (item) =>
          new SubstrateEvmContractSignature({
            id: `${contractAddress}:${item.hash}`,
            contract,
            contractType: type,
            signatureId: item.hash,
            signatureName: item.name,
            signatureType: 'event',
            network,
          })
      )
    );
    await ctx.store.save(
      functions.map(
        (item) =>
          new SubstrateEvmContractSignature({
            id: `${contractAddress}:${item.hash}`,
            contract,
            contractType: type,
            signatureId: item.hash,
            signatureName: item.name,
            signatureType: 'function',
            network,
          })
      )
    );
    await ctx.store.save(
      unknownHashes.map(
        (hash) =>
          new SubstrateEvmContractSignature({
            id: `${contractAddress}:${hash}`,
            contract,
            contractType: type,
            signatureId: hash,
            signatureType: 'unknown',
            network,
          })
      )
    );
  };
