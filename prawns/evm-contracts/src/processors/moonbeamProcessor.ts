import { SubstrateProcessor } from '@subsquid/substrate-processor';
import ethereumExecutedHanndler from '../handlers/ethereum.Executed';
import { SubstrateNetwork } from '../model';
import types from './moonbeamTypesBundle';

const processor = new SubstrateProcessor(
  'litentry_squid_evm_contracts_moonbeam'
);

processor.setTypesBundle(types);
processor.setBatchSize(100);
// processor.setBlockRange({ from: 209450 });
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://moonbeam-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://moonbeam.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'ethereum.Executed',
  ethereumExecutedHanndler(SubstrateNetwork.moonbeam)
);

processor.run();
