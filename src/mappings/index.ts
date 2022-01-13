import { EventContext, StoreContext } from '@subsquid/hydra-common';
import BigNumber from 'bignumber.js';
import { KhalaAccount, KhalaTransfer } from '../generated/model';
import { Balances } from '../types';
import { getOrCreate } from '../utils/store';
import getApi from '../utils/getApi';

export async function handleTransfer({
  store,
  event,
}: EventContext & StoreContext) {
  const api = await getApi();
  const timestamp = BigInt(event.blockTimestamp);
  const blockNumber = BigInt(event.blockNumber);
  const [from, to, amount] = new Balances.TransferEvent(event).params;

  // sender
  const accountFrom = await getOrCreate<KhalaAccount>(
    store,
    KhalaAccount,
    from.toHuman()
  );

  accountFrom.lastTransferOutBlockNumber = blockNumber;
  accountFrom.lastTransferOutTimestamp = timestamp;

  if (!accountFrom.firstTransferOutBlockNumber) {
    accountFrom.firstTransferOutBlockNumber = blockNumber;
    accountFrom.firstTransferOutTimestamp = timestamp;
  }

  // receiver
  const accountTo = await getOrCreate<KhalaAccount>(
    store,
    KhalaAccount,
    to.toHuman()
  );

  accountTo.lastTransferInBlockNumber = blockNumber;
  accountTo.lastTransferInTimestamp = timestamp;

  if (!accountTo.firstTransferInBlockNumber) {
    accountTo.firstTransferInBlockNumber = blockNumber;
    accountTo.firstTransferInTimestamp = timestamp;
  }

  // transfer
  const transfer = new KhalaTransfer();
  transfer.blockNumber = blockNumber;
  transfer.timestamp = timestamp;
  transfer.to = accountTo;
  transfer.from = accountFrom;
  transfer.amount = new BigNumber(amount.toString())
    .shiftedBy(-api.registry.chainDecimals[0])
    .toNumber();

  // persist
  store.save<KhalaAccount>(accountFrom);
  store.save<KhalaAccount>(accountTo);
  store.save<KhalaTransfer>(transfer);
}
