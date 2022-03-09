import { ExtrinsicHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../../model';
import { EthereumTransactCall as MoonbeamEthereumTransactCall } from '../../types/moonbeam/calls';

interface TransactionSignature {
  v: bigint;
  r: Uint8Array;
  s: Uint8Array;
}

type TransactionAction = TransactionAction_Call | TransactionAction_Create;

interface TransactionAction_Call {
  __kind: 'Call';
  value: Uint8Array;
}

interface TransactionAction_Create {
  __kind: 'Create';
}

interface AccessListItem {
  address: Uint8Array;
  storageKeys: Uint8Array[];
}

interface LegacyTransaction {
  nonce: bigint[];
  gasPrice: bigint[];
  gasLimit: bigint[];
  action: TransactionAction;
  value: bigint[];
  input: Uint8Array;
  signature: TransactionSignature;
}

interface EIP2930Transaction {
  chainId: bigint;
  nonce: bigint[];
  gasPrice: bigint[];
  gasLimit: bigint[];
  action: TransactionAction;
  value: bigint[];
  input: Uint8Array;
  accessList: AccessListItem[];
  oddYParity: boolean;
  r: Uint8Array;
  s: Uint8Array;
}

interface EIP1559Transaction {
  chainId: bigint;
  nonce: bigint[];
  maxPriorityFeePerGas: bigint[];
  maxFeePerGas: bigint[];
  gasLimit: bigint[];
  action: TransactionAction;
  value: bigint[];
  input: Uint8Array;
  accessList: AccessListItem[];
  oddYParity: boolean;
  r: Uint8Array;
  s: Uint8Array;
}

type Transaction =
  | {
      __kind: 'Legacy';
      value: LegacyTransaction;
    }
  | {
      __kind: 'EIP2930';
      value: EIP2930Transaction;
    }
  | {
      __kind: 'EIP1559';
      value: EIP1559Transaction;
    };

export function getEthereumTransactCall(
  ctx: ExtrinsicHandlerContext,
  network: SubstrateNetwork
): Transaction {
  switch (network) {
    case SubstrateNetwork.moonbeam: {
      const event = new MoonbeamEthereumTransactCall(ctx);

      if (event.isV900) {
        return {
          __kind: 'Legacy',
          value: event.asV900.transaction,
        };
      } else if (event.isV1201) {
        return event.asV1201.transaction;
      } else {
        return event.asLatest.transaction;
      }
    }

    default: {
      throw new Error('getEthereumTransactCall::network not supported');
    }
  }
}
