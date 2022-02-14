import fs from 'fs';
import { EventHandlerContext } from '@subsquid/substrate-processor';
import { SubstrateNetwork } from '../model';
import { encodeAddress } from '../utils/registry';
import {
  getBalancesBalanceSetEvent,
  getBalancesDepositEvent,
  getBalancesDustLostEvent,
  getBalancesEndowedEvent,
  getBalancesReserveRepatriatedEvent,
  getBalancesReservedEvent,
  getBalancesSlashedEvent,
  getBalancesTransferEvent,
  getBalancesUnreservedEvent,
  getBalancesWithdrawEvent,
} from './typeGetters/getBalancesEvents';
import handler from './balances.transfer.event';

type Getters = {
  [eventName: string]: (
    ctx: EventHandlerContext,
    network: SubstrateNetwork
  ) => unknown;
};

const getters: Getters = {
  BalanceSet: getBalancesBalanceSetEvent,
  Deposit: getBalancesDepositEvent,
  DustLost: getBalancesDustLostEvent,
  Endowed: getBalancesEndowedEvent,
  ReserveRepatriated: getBalancesReserveRepatriatedEvent,
  Reserved: getBalancesReservedEvent,
  Slashed: getBalancesSlashedEvent,
  Transfer: getBalancesTransferEvent,
  Unreserved: getBalancesUnreservedEvent,
  Withdraw: getBalancesWithdrawEvent,
};

const LOG_FILE = './logs/log.json';
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
}

const log = (data: object) => {
  const logData = JSON.parse(fs.readFileSync(LOG_FILE).toString()) as object[];
  logData.push(data);
  fs.writeFileSync(LOG_FILE, JSON.stringify(logData, null, 2));
};

const formatData = (data: any, network: SubstrateNetwork) => {
  let formatted: { [key: string]: any } = {};
  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (value?.constructor === BigInt) {
      formatted[key] = data[key].toString();
    } else if (value?.constructor === Buffer) {
      formatted[key] = encodeAddress(network, data[key]);
    } else {
      formatted[key] = value;
    }
  });

  return formatted;
};

const checkIfRelevant = (
  data: {
    who?: Uint8Array;
    account?: Uint8Array;
    to?: Uint8Array;
    from?: Uint8Array;
  },
  addressToWatch: string,
  network: SubstrateNetwork
): boolean => {
  const addresses: Uint8Array[] = [];

  if (data.who) addresses.push(data.who);
  if (data.account) addresses.push(data.account);
  if (data.to) addresses.push(data.to);
  if (data.from) addresses.push(data.from);

  const matchingAddress = addresses.find((address) => {
    return encodeAddress(network, address) === addressToWatch;
  });

  return !!matchingAddress;
};

export default (network: SubstrateNetwork, account: string) =>
  async (ctx: EventHandlerContext) => {
    if (ctx.event.method === 'Transfer') {
      await handler(network, 0)(ctx);
    }

    const blockNumber = BigInt(ctx.block.height);
    const blockHash = ctx.block.hash;
    const date = new Date(ctx.block.timestamp);
    try {
      const getter = getters[ctx.event.method as keyof Getters];
      const data = getter(ctx, network);

      if (!checkIfRelevant(data as {}, account, network)) return;

      log({
        event: ctx.event.name,
        blockNumber: blockNumber.toString(),
        index: ctx.event.indexInBlock,
        blockHash,
        date: date.toISOString(),
        data: formatData(data, network),
      });
    } catch (e) {
      console.log(e);
    }
  };
