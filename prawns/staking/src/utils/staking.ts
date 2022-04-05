import { Store } from "@subsquid/substrate-processor";
import { SubstrateNetwork, SubstrateStakingActionHistory, SubstrateStakingActionType, SubstrateStakingNominatorAccount, SubstrateStakingValidatorAccount } from "../model";

export async function createStakingActionHistory(
  store: Store,
  network: SubstrateNetwork,
  blockNumber: bigint,
  index: number,
  action: SubstrateStakingActionType,
  date: Date,
  amount: bigint,
  nominator: SubstrateStakingNominatorAccount,
  validator?: SubstrateStakingValidatorAccount,
) {

  const actionModel = new SubstrateStakingActionHistory({
    id: `${network}:${blockNumber.toString()}:${index}`,
    network,
    blockNumber,
    action,
    date,
    nominator,
    validator,
    amount,
  });

  await store.save(actionModel);
}