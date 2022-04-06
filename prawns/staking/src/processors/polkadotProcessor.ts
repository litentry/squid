import { SubstrateProcessor } from '@subsquid/substrate-processor';
import stakingActionEvent from '../handlers/staking.action.event';
import { SubstrateNetwork, SubstrateStakingActionType } from '../model';

const processor = new SubstrateProcessor('litentry_squid_staking_polkadot');

processor.setTypesBundle('polkadot');
processor.setBatchSize(500);
processor.setIsolationLevel('REPEATABLE READ');
processor.setDataSource({
  archive: 'https://polkadot-squid-archive.litentry.io/graphql/v1/graphql',
  chain: 'wss://polkadot.api.onfinality.io/public-ws',
});
processor.addEventHandler(
  'staking.Bonded',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Bonded)
);
processor.addEventHandler(
  'staking.Unbonded',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Unbonded)
);
processor.addEventHandler(
  'staking.Chilled',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Chilled)
);
processor.addEventHandler(
  'staking.Kicked',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Kicked)
);
processor.addEventHandler(
  'staking.PayoutStarted',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.PayoutStarted)
);
processor.addEventHandler(
  'staking.Rewarded',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Rewarded)
);
processor.addEventHandler(
  'staking.Slashed',
  stakingActionEvent(SubstrateNetwork.polkadot, 0, SubstrateStakingActionType.Slashed)
);
processor.run();
