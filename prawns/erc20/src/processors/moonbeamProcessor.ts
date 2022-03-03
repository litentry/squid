import { SubstrateProcessor } from '@subsquid/substrate-processor';
import ethereumTransactionHanndler from '../handlers/ehereum.transact.extrinsic';
import { SubstrateNetwork } from '../model';
import types from './moonbeamTypesBundle';

const processor = new SubstrateProcessor('litentry_squid_erc20_moonbeam');

processor.setTypesBundle(types);
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://moonbeam-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://moonbeam.api.onfinality.io/public-ws',
});
processor.addExtrinsicHandler(
  'ethereum.transact',
  ethereumTransactionHanndler(SubstrateNetwork.moonbeam)
);

processor.run();
