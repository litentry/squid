import fetch from 'node-fetch';
import { SubstrateNetwork } from '../../model';
import { SubsquareDemocracyProposal } from './types';

const getDemocracyProposal = async (network: SubstrateNetwork, proposalIndex: number): Promise<SubsquareDemocracyProposal> => {
  const response = await fetch(`https://${network}.subsquare.io/api/democracy/proposals/${proposalIndex}`);
  return await response.json() as unknown as SubsquareDemocracyProposal;
}

export default {
  getDemocracyProposal
}

