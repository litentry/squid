import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { PhragmenElectionVoteCall as KusamaPhragmenElectionVoteCall } from '../../types/kusama/calls';
import { PhragmenElectionVoteCall as PolkadotPhragmenElectionVoteCall } from '../../types/polkadot/calls';
import { PhragmenElectionVoteCall as KhalaPhragmenElectionVoteCall } from '../../types/polkadot/calls';

export function getPhragmenElectionVoteCall(
  ctx: ExtrinsicHandlerContext,
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
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotPhragmenElectionVoteCall(ctx);

      if (event.isV9050) {
        return event.asV9050;
      } else {
        return event.asLatest;
      }
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaPhragmenElectionVoteCall(ctx);

      if (event.isV9050) {
        return event.asV9050;
      } else {
        return event.asLatest;
      }
    }

    default: {
      throw new Error('getPhragmenElectionVoteCall::network not supported');
    }
  }
}
