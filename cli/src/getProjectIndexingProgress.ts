import axios from 'axios';
import { execSync } from 'child_process';

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
    const chainHeightMatches = /([\d.]+)/g.exec(chainHeight) || [0];

    const lastBlock = (await axios.get(`http://${container.host}/metrics/sqd_processor_last_block`)).data.toString();
    const lastBlockMatches = /([\d.]+)/g.exec(lastBlock) || [0];

    const progress = Number(lastBlockMatches[0]) / Number(chainHeightMatches[0]);

    return { ...container, progress };
}));

