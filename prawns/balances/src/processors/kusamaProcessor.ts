import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import balanceEndowedHandler from '../handlers/balances.endowed.event';
import treasuryDepositHandler from '../handlers/treasury.deposit.event';
import { SubstrateNetwork } from '../model';
import treasuryAwardedHandler from "../handlers/treasury.awarded.event";
import balanceSetHandler from "../handlers/balances.balanceset.event";
import balanceDepositHandler from "../handlers/balances.deposit.event";

const processor = new SubstrateProcessor('litentry_squid_balances_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});

processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.kusama, 0)
);
processor.addEventHandler(
  'treasury.Deposit',
  treasuryDepositHandler(SubstrateNetwork.kusama, 0)
);
processor.addEventHandler(
  'treasury.Awarded',
  treasuryAwardedHandler(SubstrateNetwork.kusama, 0)
);
processor.addEventHandler(
  'balances.BalanceSet',
  balanceSetHandler(SubstrateNetwork.kusama, 0)
);
processor.addEventHandler(
  'balances.Endowed',
  balanceEndowedHandler(SubstrateNetwork.kusama, 0)
);
processor.addEventHandler(
  'balances.Deposit',
  balanceDepositHandler(SubstrateNetwork.polkadot, 0)
);

processor.run();
