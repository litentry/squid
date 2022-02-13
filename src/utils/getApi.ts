import { WsProvider, ApiPromise } from '@polkadot/api';
import { SubstrateNetwork } from '../model';

type Api = {
  [SubstrateNetwork.phala]: ApiPromise;
  [SubstrateNetwork.polkadot]: ApiPromise;
  [SubstrateNetwork.kusama]: ApiPromise;
};

let api = {} as Api;

const providers = {
  [SubstrateNetwork.phala]: 'wss://khala.api.onfinality.io/public-ws',
  [SubstrateNetwork.polkadot]: 'wss://polkadot.api.onfinality.io/public-ws',
  [SubstrateNetwork.kusama]: 'wss://kusama.api.onfinality.io/public-ws',
};

export default async function getApi(
  network: SubstrateNetwork
): Promise<ApiPromise> {
  if (!api[network]) {
    api[network] = await ApiPromise.create({
      provider: new WsProvider(providers[network]),
    });

    await api[network].isReady;
  }

  return api[network];
}
