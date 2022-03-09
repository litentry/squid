import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { request, gql } from 'graphql-request';
import Web3 from 'web3';
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

// todo recycle and remove
const web3 = new Web3(
  `wss://moonbeam.api.onfinality.io/ws?apikey=284d5136-3feb-4ebc-a1b4-697b400ebd18`
);
// const web3 = new Web3(
//   `wss://moonbeam.api.onfinality.io/ws?apikey=${process.env.FINALITY_MOONBEAM_API_KEY}`
// );

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const substrateTxHash = ctx.extrinsic.hash;
    if (!substrateTxHash) return;

    const blockNumber = ctx.block.height;
    const { input } = (ctx.extrinsic.args as any)[0].value;

    const evmTxHash = await getEvmTxHash(substrateTxHash, blockNumber);
    if (!evmTxHash) return;

    if (!isContractCreationInput(input)) return;

    const { events, functions, unknownHashes } = getContractData(input);

    const functionNames = functions
      .filter((func) => func.name)
      .map((func) => func.name) as string[];
    const type = getContractType(functionNames);

    const tx = await web3.eth.getTransaction(evmTxHash);
    // @ts-ignore todo find out why this is a secret
    const contractAddress = tx.creates as string;

    const contract = new SubstrateEvmContract({
      id: contractAddress,
      type,
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

// todo - replace this when we can - I assume subsquid will make the data visible
async function getEvmTxHash(
  substrateTxHash: string,
  blockNumber: number
): Promise<string | null> {
  const query = gql`
    query MyQuery($substrateTxHash: String!, $blockNumber: bigint!) {
      substrate_extrinsic(
        limit: 1
        where: {
          hash: { _eq: $substrateTxHash }
          blockNumber: { _eq: $blockNumber }
        }
      ) {
        substrate_events(limit: 1) {
          evmHash
        }
      }
    }
  `;

  try {
    const response = await request(
      'https://moonbeam-squid-archive.litentry.io/graphql/v1/graphql',
      query,
      {
        substrateTxHash,
        blockNumber,
      }
    );
    return response.substrate_extrinsic[0].substrate_events[0].evmHash;
  } catch (error) {
    console.log(error);
    return null;
  }
}
