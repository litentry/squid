import axios from 'axios';
import { execSync } from 'child_process';

const ROUNDING_MULTIPLIER = 100000000;
const ROUNDING_DIVIDER = ROUNDING_MULTIPLIER / 100;

const getIndexingProcessorContainers = (projectName: string) => {
  const containerRows = execSync(`docker ps --filter label='com.docker.compose.project=${projectName}' --filter expose=3000 --format='{{.ID}},{{.Names}}'`).toString().trim().split('\n');

  return containerRows.map(containerRow => {
    const [id, name] = containerRow.trim().split(',');
    const host = execSync(`docker container port ${id} 3000/tcp`).toString().split("\n")[0].trim();
    return { id, name, host };
  });
};

export default async (projectName: string) => Promise.all(
  getIndexingProcessorContainers(projectName).map(async (container) => {
    const chainHeight = (await axios.get(`http://${container.host}/metrics/sqd_processor_chain_height`)).data.toString();
    const chainHeightMatches = /([\d.]+)/g.exec(chainHeight)?.[0] || 0;

    const lastBlock = (await axios.get(`http://${container.host}/metrics/sqd_processor_last_block`)).data.toString();
    const lastBlockMatches = /([\d.]+)/g.exec(lastBlock)?.[0] || 1;

    const progress = Math.round(Number(lastBlockMatches) / Number(chainHeightMatches) * ROUNDING_MULTIPLIER) / ROUNDING_DIVIDER;

    return { ...container, progress };
}));

