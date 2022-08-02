import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceSetHandler from '../handlers/balances.balanceset.event';
import balanceDepositHandler from '../handlers/balances.deposit.event';
import balanceEndowedHandler from '../handlers/balances.endowed.event';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import treasuryAwardedHandler from '../handlers/treasury.awarded.event';
import { SubstrateNetwork } from '../model';

const processor = new SubstrateProcessor('litentry_squid_balances_khala');

processor.setTypesBundle('khala');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://khala-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://khala.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.phala, 0)
);
processor.addEventHandler(
  'treasury.Awarded',
  treasuryAwardedHandler(SubstrateNetwork.phala, 0)
);
processor.addEventHandler(
  'balances.BalanceSet',
  balanceSetHandler(SubstrateNetwork.phala, 0)
);
processor.addEventHandler(
  'balances.Endowed',
  balanceEndowedHandler(SubstrateNetwork.phala, 0)
);
processor.addEventHandler(
  'balances.Deposit',
  balanceDepositHandler(SubstrateNetwork.phala, 0)
);

processor.run();
