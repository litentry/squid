import { SubstrateProcessor } from '@subsquid/substrate-processor';
import stakingActionEvent from '../handlers/staking.action.event';
import { SubstrateNetwork, SubstrateStakingActionType } from '../model';

const processor = new SubstrateProcessor('litentry_squid_identities_kusama');

processor.setTypesBundle('kusama');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://kusama.indexer.gc.subsquid.io/v4/graphql',
  chain: 'wss://kusama.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'staking.Bonded',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.bonded)
);
processor.addEventHandler(
  'staking.Unbonded',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.unbonded)
);
processor.addEventHandler(
  'staking.Chilled',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.chilled)
);
processor.addEventHandler(
  'staking.Kicked',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.kicked)
);
processor.addEventHandler(
  'staking.PayoutStarted',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.payoutStarted)
);
processor.addEventHandler(
  'staking.Rewarded',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.rewarded)
);
processor.addEventHandler(
  'staking.Slashed',
  stakingActionEvent(SubstrateNetwork.kusama, 0, SubstrateStakingActionType.slashed)
);
processor.run();
