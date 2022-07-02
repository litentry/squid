import fetch from 'node-fetch';
import { SubstrateNetwork } from '../../model';
import { SubsquareDemocracyProposal, SubsquareDemocracyReferenda } from './types';

const getDemocracyProposal = async (network: SubstrateNetwork, proposalIndex: number): Promise<SubsquareDemocracyProposal> => {
  const response = await fetch(`https://${network}.subsquare.io/api/democracy/proposals/${proposalIndex}`);
  return await response.json() as unknown as SubsquareDemocracyProposal;
}

const getDemocracyReferenda = async (network: SubstrateNetwork, referendaIndex: number): Promise<SubsquareDemocracyReferenda> => {
  const response = await fetch(`https://${network}.subsquare.io/api/democracy/referendums/${referendaIndex}`);
  return await response.json() as unknown as SubsquareDemocracyReferenda;
}

export default {
  getDemocracyProposal,
  getDemocracyReferenda
}

