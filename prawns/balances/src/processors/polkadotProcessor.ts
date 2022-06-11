import { SubstrateProcessor } from '@subsquid/substrate-processor';
import balanceTransferHandler from '../handlers/balances.transfer.event';
import balanceEndowedHandler from '../handlers/balances.endowed.event';
import treasuryDepositHandler from '../handlers/treasury.deposit.event';
import { SubstrateNetwork } from '../model';
import treasuryAwardedHandler from "../handlers/treasury.awarded.event";
import balanceSetHandler from "../handlers/balances.balanceset.event";

const processor = new SubstrateProcessor('litentry_squid_balances_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'balances.Transfer',
  balanceTransferHandler(SubstrateNetwork.polkadot, 0)
);
processor.addEventHandler(
  'treasury.Deposit',
  treasuryDepositHandler(SubstrateNetwork.polkadot, 0)
);
processor.addEventHandler(
  'treasury.Awarded',
  treasuryAwardedHandler(SubstrateNetwork.polkadot, 0)
);
processor.addEventHandler(
  'balances.BalanceSet',
  balanceSetHandler(SubstrateNetwork.polkadot, 0)
);
processor.addEventHandler(
  'balances.Endowed',
  balanceEndowedHandler(SubstrateNetwork.polkadot, 0)
);

processor.run();
