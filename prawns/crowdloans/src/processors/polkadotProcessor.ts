import { SubstrateProcessor } from '@subsquid/substrate-processor';
import crowdloanContributedHandler from '../handlers/crowdloan.contributed.event';
import { SubstrateNetwork } from '../model';
import { TypeormDatabase } from '@subsquid/typeorm-store'
import { lookupArchive } from '@subsquid/archive-registry';

const processor = new SubstrateProcessor(new TypeormDatabase());
processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setBlockRange({ from: 7554350 });
processor.setDataSource({
  archive: lookupArchive("polkadot", { release: "FireSquid" })
});

processor.addEventHandler(
  'Crowdloan.Contributed',
  crowdloanContributedHandler(SubstrateNetwork.polkadot, 0)
);

processor.run();

