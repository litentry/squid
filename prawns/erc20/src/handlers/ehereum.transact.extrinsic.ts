import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { request, gql } from 'graphql-request';
import Web3 from 'web3';
import { SubstrateNetwork } from '../model';
import { getContractType } from '../evm-lib';

// todo get rid of this disposable key
const web3 = new Web3(
  'wss://moonbeam.api.onfinality.io/ws?apikey=595be5a3-8d26-417c-91e1-1c29ee03be12'
);

export default (network: SubstrateNetwork) =>
  async (ctx: ExtrinsicHandlerContext) => {
    const substrateTxHash = ctx.extrinsic.hash;
    if (!substrateTxHash) {
      return;
    }

    const blockNumber = ctx.block.height;
    const { input } = (ctx.extrinsic.args as any)[0].value;

    const contractType = getContractType(input);
    if (!contractType) {
      return;
    }

    const evmTxHash = await getEvmTxHash(substrateTxHash, blockNumber);
    if (!evmTxHash) {
      return;
    }

    const tx = await web3.eth.getTransaction(evmTxHash);
    // @ts-ignore todo find out why this is a secret
    const contractAddress = tx.creates as string;

    console.log({
      contractAddress, // id
      contractType, // index
      network, // index
      evmTxHash, // unique
    });
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
