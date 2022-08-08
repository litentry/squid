import { SubstrateProcessor } from '@subsquid/substrate-processor';
import config from './config';
import { PrawnEventHandler, PrawnExtrinsicHandler, SubstrateNetwork } from './types';

export class PrawnProcessor extends SubstrateProcessor {

}

export default (
  prawnName: string,
  substrateNetwork: SubstrateNetwork
) => {

  const chainName = substrateNetwork === SubstrateNetwork.phala ? 'khala' : substrateNetwork;
  const processor = new SubstrateProcessor(`litentry_squid_${prawnName}_${chainName}`);
  processor.setTypesBundle(chainName);
  processor.setBatchSize(500);
  processor.setIsolationLevel('REPEATABLE READ');
  const chainConfig = config[chainName];
  processor.setDataSource({
    archive: chainConfig.archive,
    chain: chainConfig.chain
  });

  const addEventHandlers = (eventHandlers: PrawnEventHandler[]) => {
    eventHandlers.forEach(eventHandler => {
      const handler = eventHandler.getHandler(substrateNetwork);
      eventHandler
        .getEventNames()
        .forEach(eventName =>
          processor.addEventHandler(eventName, handler));
    });
  };

  const addExtrinsicHandlers = (extrinsicHandlers: PrawnExtrinsicHandler[]) => {
    extrinsicHandlers.forEach(extrinsicHandler => {
      const handler = extrinsicHandler.getHandler(substrateNetwork);
      extrinsicHandler
        .getExtrinsicNames()
        .forEach(extrinsicName =>
          processor.addExtrinsicHandler(extrinsicName, handler));
    });
  };

  return {
    processor, // processor is still available to call directly
    run: processor.run.bind(processor),
    addEventHandlers,
    addExtrinsicHandlers,
  }
}