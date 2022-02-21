import axios from 'axios';
import { execSync } from 'child_process';

const getIndexingProcessorContainers = (projectName: string) => {
  const containerRows = execSync(`docker ps --filter label='com.docker.compose.project=${projectName}' --filter expose=3000 --format='{{.ID}},{{.Names}}'`).toString().trim().split('\n');

  return containerRows.map(containerRow => {
    const [id, name] = containerRow.trim().split(',');
    const host = execSync(`docker container port ${id} 3000/tcp`).toString().trim();
    return { id, name, host };
  });
};

export default async (projectName: string) => Promise.all(
  getIndexingProcessorContainers(projectName).map(async (container) => {
    const progressString = (await axios.get(`http://${container.host}/metrics/sqd_processor_sync_ratio`)).data.toString();
    const progressMatches = /([\d.]+)/g.exec(progressString) || [0];
    const progress = Number(progressMatches[0]);

    return { ...container, progress };
}));

