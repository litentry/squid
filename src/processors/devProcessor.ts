import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balancesHandler from '../handlers/balances.dev.event';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});

const events = [
  'balances.BalanceSet',
  'balances.Deposit',
  'balances.DustLost',
  'balances.Endowed',
  'balances.Reserved',
  'balances.ReserveRepatriated',
  'balances.Slashed',
  'balances.Transfer',
  'balances.Unreserved',
  'balances.Withdraw',
];

events.forEach((event) => {
  processor.addEventHandler(
    event,
    balancesHandler(SubstrateNetwork.phala, process.env.DEV_ACCOUNT!)
  );
});

processor.run();
