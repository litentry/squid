import fetch from 'node-fetch';
import { SubstrateNetwork } from '../../model';
import {
  SubsquareDemocracyProposal,
  SubsquareDemocracyReferenda,
  SubsquareTreasuryProposal,
} from './types';

const getBaseUrl = (network: SubstrateNetwork) => {
  const subdomain = network === SubstrateNetwork.phala ? 'khala' : network;
  return `https://${subdomain}.subsquare.io/api/`;
};

const getDemocracyProposal = async (
  network: SubstrateNetwork,
  proposalIndex: number
): Promise<SubsquareDemocracyProposal> => {
  const response = await fetch(
    `${getBaseUrl(network)}/democracy/proposals/${proposalIndex}`
  );
  return (await response.json()) as unknown as SubsquareDemocracyProposal;
};

const getDemocracyReferenda = async (
  network: SubstrateNetwork,
  referendaIndex: number
): Promise<SubsquareDemocracyReferenda> => {
  const response = await fetch(
    `https://${network}.subsquare.io/api/democracy/referendums/${referendaIndex}`
  );
  return (await response.json()) as unknown as SubsquareDemocracyReferenda;
};

const getTreasuryProposal = async (
  network: SubstrateNetwork,
  proposalIndex: number
): Promise<SubsquareDemocracyReferenda> => {
  const response = await fetch(
    `https://${network}.subsquare.io/api/treasury/proposals/${proposalIndex}`
  );
  return (await response.json()) as unknown as SubsquareTreasuryProposal;
};

export default {
  getDemocracyProposal,
  getDemocracyReferenda,
  getTreasuryProposal,
};
