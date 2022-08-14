import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { CouncilExecutedEvent as KusamaCouncilExecutedEvent } from '../../types/kusama/events';
import { CouncilExecutedEvent as PolkadotCouncilExecutedEvent } from '../../types/polkadot/events';
import { CouncilExecutedEvent as KhalaCouncilExecutedEvent } from '../../types/khala/events';
import { Store } from '@subsquid/typeorm-store';

export function getCouncilExecutedEvent(
  ctx: EventHandlerContext<Store>,
  network: SubstrateNetwork
): { proposalHash: Uint8Array; result: boolean; originalResult: any } {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaCouncilExecutedEvent(ctx);
      if (event.isV9130) {
        return {
          proposalHash: event.asV9130.proposalHash,
          result: event.asV9130.result.__kind === 'Ok',
          originalResult: event.asV9130.result,
        };
      }
      if (event.isV9190) {
        return {
          proposalHash: event.asV9190.proposalHash,
          result: event.asV9190.result.__kind === 'Ok',
          originalResult: event.asV9190.result,
        };
      }
      if (event.isV9170) {
        return {
          proposalHash: event.asV9170.proposalHash,
          result: event.asV9170.result.__kind === 'Ok',
          originalResult: event.asV9170.result,
        };
      }
      if (event.isV1020) {
        const [proposalHash, result] = event.asV1020;
        return {
          proposalHash,
          result,
          originalResult: result,
        };
      }
      if (event.isV2005) {
        const [proposalHash, result] = event.asV2005;
        return {
          proposalHash,
          result: result.__kind === 'Ok',
          originalResult: result,
        };
      }
      if (event.isV9111) {
        const [proposalHash, result] = event.asV9111;
        return {
          proposalHash,
          result: result.__kind === 'Ok',
          originalResult: result,
        };
      }
      if (event.isV9160) {
        return {
          proposalHash: event.asV9160.proposalHash,
          result: event.asV9160.result.__kind === 'Ok',
          originalResult: event.asV9160.result,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotCouncilExecutedEvent(ctx);

      if (event.isV0) {
        const [proposalHash, result] = event.asV0;
        return {
          proposalHash,
          result: result.__kind === 'Ok',
          originalResult: result,
        };
      }
      if (event.isV9140) {
        return {
          proposalHash: event.asV9140.proposalHash,
          result: event.asV9140.result.__kind === 'Ok',
          originalResult: event.asV9140.result,
        };
      }
      if (event.isV9170) {
        return {
          proposalHash: event.asV9170.proposalHash,
          result: event.asV9170.result.__kind === 'Ok',
          originalResult: event.asV9170.result,
        };
      }
      if (event.isV9110) {
        const [proposalHash, result] = event.asV9110;
        return {
          proposalHash,
          result: result.__kind === 'Ok',
          originalResult: result,
        };
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaCouncilExecutedEvent(ctx);

      if (event.isV1) {
        const [proposalHash, result] = event.asV1;
        return {
          proposalHash,
          result: result.__kind === 'Ok',
          originalResult: result,
        };
      }

      if (event.isV1090) {
        return {
          proposalHash: event.asV1090.proposalHash,
          result: event.asV1090.result.__kind === 'Ok',
          originalResult: event.asV1090.result,
        };
      }

      if (event.isV1110) {
        return {
          proposalHash: event.asV1110.proposalHash,
          result: event.asV1110.result.__kind === 'Ok',
          originalResult: event.asV1110.result,
        };
      }

      if (event.isV1120) {
        return {
          proposalHash: event.asV1120.proposalHash,
          result: event.asV1120.result.__kind === 'Ok',
          originalResult: event.asV1120.result,
        };
      }

      if (event.isV1140) {
        return {
          proposalHash: event.asV1140.proposalHash,
          result: event.asV1140.result.__kind === 'Ok',
          originalResult: event.asV1140.result,
        };
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('Network not supported');
    }
  }
}
