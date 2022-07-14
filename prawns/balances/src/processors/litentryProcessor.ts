import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import balanceEndowedHandler from '../handlers/balances.endowed.event';
import treasuryDepositHandler from '../handlers/treasury.deposit.event';
import treasuryAwardedHandler from '../handlers/treasury.awarded.event';
import balanceSetHandler from '../handlers/balances.balanceset.event';
import { SubstrateNetwork } from '../model';
import balanceDepositHandler from "../handlers/balances.deposit.event";

const processor = new SubstrateProcessor('litentry_squid_balances_litentry');

// processor.setTypesBundle('../typegen/litentryTypesBundle.json');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://litentry-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://rpc.litentry-parachain.litentry.io',
});
processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.litentry, 0)
);
processor.addEventHandler(
  'treasury.Deposit',
  treasuryDepositHandler(SubstrateNetwork.litentry, 0)
);
processor.addEventHandler(
  'treasury.Awarded',
  treasuryAwardedHandler(SubstrateNetwork.litentry, 0)
);
processor.addEventHandler(
  'balances.BalanceSet',
  balanceSetHandler(SubstrateNetwork.litentry, 0)
);
processor.addEventHandler(
  'balances.Endowed',
  balanceEndowedHandler(SubstrateNetwork.litentry, 0)
);
processor.addEventHandler(
  'balances.Deposit',
  balanceDepositHandler(SubstrateNetwork.litentry, 0)
);

processor.run();
