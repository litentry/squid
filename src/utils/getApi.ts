import { WsProvider, ApiPromise } from '@polkadot/api';

let api: ApiPromise;

export default async function getApi(): Promise<ApiPromise> {
  if (!api) {
    api = await ApiPromise.create({
      provider: new WsProvider('wss://rpc.polkadot.io'),
    });

    await api.isReady;
  }

  return api;
}
