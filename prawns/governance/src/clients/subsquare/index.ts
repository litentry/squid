import fetch from 'node-fetch';
import { SubstrateNetwork } from '../../model';
import { SubsquareDemocracyProposal } from './types';

const getBaseUrl = (network: SubstrateNetwork) => {
  const subdomain = network === SubstrateNetwork.phala ? 'khala' : network;
  return `https://${subdomain}.subsquare.io/api/`;
}

const getDemocracyProposal = async (network: SubstrateNetwork, proposalIndex: number): Promise<SubsquareDemocracyProposal> => {
  const response = await fetch(`${getBaseUrl(network)}/democracy/proposals/${proposalIndex}`);
  return await response.json() as unknown as SubsquareDemocracyProposal;
}

export default {
  getDemocracyProposal
}

