import { CallHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { DemocracyVoteCall as KusamaDemocracyVoteCall } from '../../types/kusama/calls';
import { DemocracyVoteCall as PolkadotDemocracyVoteCall } from '../../types/polkadot/calls';
import { DemocracyVoteCall as KhalaDemocracyVoteCall } from '../../types/khala/calls';
import { Store } from '@subsquid/typeorm-store';
/*
TODO: figure out how to interpret votes. Original Kusama votes are just numbers (they appear to always be 0 or 128).

Newer votes all fit the shape in the types below (albeit reformatted a little).

On a standard vote the "vote" property appears to match the original Kusama types, which had no balance/bigint field.

Investigate:

- original votes used balance at block for the weight? Or had no weight concept?
- split votes have no "vote: number" property, why?
- what is the "vote: number" property?

It's very hard to flatten this data into a postgres table without a proper understanding, so JSON.stringify is being used now to save the raw vote datas
*/
export type AccountVote = AccountVoteStandard | AccountVoteSplit;

interface AccountVoteStandard {
  __kind: 'Standard';
  vote: number;
  balance: bigint; // tokens
}

interface AccountVoteSplit {
  __kind: 'Split';
  aye: bigint; // tokens?
  nay: bigint; // tokens?
}

export function getDemocracyVoteCall(
  ctx: CallHandlerContext<Store>,
  network: SubstrateNetwork
): {
  refIndex: number;
  vote: AccountVote;
} {
  switch (network) {
    case SubstrateNetwork.kusama: {
      const event = new KusamaDemocracyVoteCall(ctx);

      if (event.isV1020) {
        const { refIndex, vote } = event.asV1020;
        return {
          refIndex,
          vote: {
            __kind: 'Standard',
            vote,
            // This is not correct.. there is a balance but it is not in the extrinsic
            balance: BigInt(1),
          },
        };
      }

      if (event.isV1055) {
        const { refIndex, vote } = event.asV1055;
        return {
          refIndex,
          vote: convertLegacyAccountVote(vote),
        };
      }

      if (event.isV9111) {
        return event.asV9111;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.polkadot: {
      const event = new PolkadotDemocracyVoteCall(ctx);

      if (event.isV0) {
        const { refIndex, vote } = event.asV0;
        return {
          refIndex,
          vote: convertLegacyAccountVote(vote),
        };
      }

      if (event.asV9110) {
        return event.asV9110;
      }

      throw new Error('Unexpected version');
    }

    case SubstrateNetwork.phala: {
      const event = new KhalaDemocracyVoteCall(ctx);

      if (event.isV1) {
        const { refIndex, vote } = event.asV1;
        return {
          refIndex,
          vote: convertLegacyAccountVote(vote),
        };
      }

      if (event.isV1090) {
        return event.asV1090;
      }

      throw new Error('Unexpected version');
    }

    default: {
      throw new Error('getDemocracyVoteCall::network not supported');
    }
  }
}

function convertLegacyAccountVote(
  data:
    | {
        __kind: 'Standard';
        value: {
          vote: number;
          balance: bigint;
        };
      }
    | {
        __kind: 'Split';
        value: {
          aye: bigint;
          nay: bigint;
        };
      }
): AccountVote {
  if (data.__kind === 'Standard') {
    return {
      __kind: 'Standard',
      ...data.value,
    };
  }

  return {
    __kind: 'Split',
    ...data.value,
  };
}
