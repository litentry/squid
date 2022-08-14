import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { PhragmenElectionVoteCall as KusamaPhragmenElectionVoteCall } from '../../types/kusama/calls';
import { PhragmenElectionVoteCall as PolkadotPhragmenElectionVoteCall } from '../../types/polkadot/calls';
import { PhragmenElectionVoteCall as KhalaPhragmenElectionVoteCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';

export function getPhragmenElectionVoteCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): {
  votes: Uint8Array[];
  value: bigint;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaPhragmenElectionVoteCall(ctx);

      if (event.isV9010) {
        return event.asV9010;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotPhragmenElectionVoteCall(ctx);

      if (event.isV9050) {
        return event.asV9050;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaPhragmenElectionVoteCall(ctx);

      if (event.isV14) {
        return event.asV14;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getPhragmenElectionVoteCall::network not supported');
    }
  }
}
