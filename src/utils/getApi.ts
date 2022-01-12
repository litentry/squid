import { WsProvider, ApiPromise } from '@polkadot/api';

let api: ApiPromise;

export default async function getApi(): Promise<ApiPromise> {
  if (!api) {
    api = await ApiPromise.create({
      provider: new WsProvider(process.env.CHAIN_NODE),
    });

    await api.isReady;
  }

  return api;
}
