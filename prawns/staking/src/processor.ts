import { SubstrateProcessor } from '@subsquid/substrate-processor';
import stakingActionEvent from './handlers/staking.action.event';
import stakingNominateCall from './handlers/staking.nominate.extrinsic';
import { SubstrateNetwork, SubstrateStakingActionType } from './model';
import { KnownArchives, lookupArchive } from '@subsquid/archive-registry';
import { TypeormDatabase } from '@subsquid/typeorm-store';

const supportedNetworks = ['kusama', 'polkadot'];
const network: SubstrateNetwork = process.env.NETWORK as SubstrateNetwork;

if (!supportedNetworks.includes(network)) {
  throw Error('Network not supported');
}

new SubstrateProcessor(new TypeormDatabase())
  .setTypesBundle('kusama')
  // .setBlockRange({from: 5000000})
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive(network as KnownArchives, { release: 'FireSquid' })
})
.addCallHandler(
  'Staking.nominate',
  stakingNominateCall(network, 0)
).addEventHandler(
  'Staking.Bonded',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Bonded)
).addEventHandler(
  'Staking.Unbonded',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Unbonded)
).addEventHandler(
  'Staking.Chilled',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Chilled)
).addEventHandler(
  'Staking.Kicked',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Kicked)
).addEventHandler(
  'Staking.PayoutStarted',
  stakingActionEvent(network, 0, SubstrateStakingActionType.PayoutStarted)
).addEventHandler(
  'Staking.Rewarded',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Rewarded)
).addEventHandler(
  'Staking.Slashed',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Slashed)
).addEventHandler(
  'Staking.Withdrawn',
  stakingActionEvent(network, 0, SubstrateStakingActionType.Withdrawn)
)
  .run();
