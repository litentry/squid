import { WsProvider, ApiPromise } from '@polkadot/api';

let api: ApiPromise;

export default async function getApi(): Promise<ApiPromise> {
  if (!api) {
    api = await ApiPromise.create({
      provider: new WsProvider('wss://khala.api.onfinality.io/public-ws'),
    });

    await api.isReady;
  }

  return api;
}
