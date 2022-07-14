import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import balanceEndowedHandler from '../handlers/balances.endowed.event';
import treasuryDepositHandler from '../handlers/treasury.deposit.event';
import treasuryAwardedHandler from '../handlers/treasury.awarded.event';
import balanceSetHandler from '../handlers/balances.balanceset.event';
import { SubstrateNetwork } from '../model';
import balanceDepositHandler from "../handlers/balances.deposit.event";

const processor = new SubstrateProcessor('litentry_squid_balances_litmus');

// processor.setTypesBundle('../typegen/litmusTypesBundle.json');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://litmus-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://rpc.litmus-parachain.litentry.io',
});
processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.litmus, 0)
);
processor.addEventHandler(
  'treasury.Deposit',
  treasuryDepositHandler(SubstrateNetwork.litmus, 0)
);
processor.addEventHandler(
  'treasury.Awarded',
  treasuryAwardedHandler(SubstrateNetwork.litmus, 0)
);
processor.addEventHandler(
  'balances.BalanceSet',
  balanceSetHandler(SubstrateNetwork.litmus, 0)
);
processor.addEventHandler(
  'balances.Endowed',
  balanceEndowedHandler(SubstrateNetwork.litmus, 0)
);
processor.addEventHandler(
  'balances.Deposit',
  balanceDepositHandler(SubstrateNetwork.litmus, 0)
);

processor.run();
