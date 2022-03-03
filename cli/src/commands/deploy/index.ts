import {Command, Flags} from '@oclif/core'
import {existsSync, mkdirSync, unlinkSync, writeFileSync} from 'fs';
import { execSync } from 'child_process';
import getProjectIndexingProgress from '../../getProjectIndexingProgress';
import cli from 'cli-ux';

export default class Deploy extends Command {

  private module: string = '';
  private version: string = '';

  static description = 'Deploy a module'

  static examples = [
    `$ oex deploy balances`,
  ]

  static flags = {
    // can pass either --force or -f
    force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'module', description: 'Module to deploy', required: true}]

  async run(): Promise<void> {
    const {args, flags} = await this.parse(Deploy);
    this.module = args.module;

    if (!this.moduleExists()) {
      return this.error(`Module ${this.module} does not exist`);
    }

    if (this.lockFileExists() && !flags.force) {
      return this.error('Lock file exists - is a deployment already in progress?');
    }

    this.log("Pull latest changes:");
    this.log(this.gitPull().toString());

    this.version = this.getVersion();

    this.log("Create lock file for deployment:");
    this.createLockFile({version: this.version});

    this.log("Start indexing:");
    this.log(this.startIndexing().toString());

    let indexingComplete = false;
    while (!indexingComplete) {
      await this.sleep(10000);
      const containers = await getProjectIndexingProgress(this.getProjectName());
      indexingComplete = containers.every((container) => container.progress === 1);
      cli.table(containers, { name: {}, progress: {} });
    }

    this.log("Indexing complete");

    this.log("Start query node:");
    this.log(this.startQueryNode().toString());

    await this.sleep(2000);

    this.log("Reload Nginx:");
    this.log(this.reloadNginx().toString());

    this.log("Take down old version:");
    this.log(this.takeDownOldVersion().toString());

    await this.sleep(2000);

    this.log("Reload Nginx:");
    this.log(this.reloadNginx().toString());

    this.log("Delete lock file:");
    this.removeLockFile();

  }

  private getVersion = () => execSync('git rev-parse --short HEAD').toString().trim();

  private gitPull = () => execSync('git pull');

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getModuleDir = () => `${this.getProjectRootDir()}/prawns/${this.module}`;

  private getLockfileName = () => `${this.getProjectRootDir()}/.deployments/${this.module}`;

  private moduleExists = () => existsSync(this.getModuleDir());

  private lockFileExists = () => existsSync(this.getLockfileName());

  private sleep = (time: number) => new Promise(r => setTimeout(r, time));

  private createLockFile = (deploymentConfig: object) => {
    const lockFileDir = `${this.getProjectRootDir()}/.deployments/`;
    if (!existsSync(lockFileDir)){
      mkdirSync(lockFileDir);
    }
    return writeFileSync(this.getLockfileName(), JSON.stringify(deploymentConfig));
  }

  private getProjectName = () => `${this.module}_${this.version}`;

  private startIndexing = () => execSync(`docker-compose --profile indexing -p ${this.getProjectName()} up --build -d`, {cwd: this.getModuleDir()});

  private startQueryNode = () => execSync(`docker-compose --profile querying -p ${this.getProjectName()} up --build -d`, {cwd: this.getModuleDir()});

  private reloadNginx = () => execSync(`docker exec $(docker ps -f name=nginx --quiet) /usr/sbin/nginx -s reload`);

  private takeDownOldVersion = () => {
    const projects = execSync(`docker ps --filter "label=com.docker.compose.project" -q | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.project"}}'`).toString().trim().split("\n");
    console.log(projects);
    const projectsToCleanUp = [...new Set(projects)].filter((project: string) => project.startsWith(`${this.module}_`) && project !== this.getProjectName());
    console.log(projectsToCleanUp);
    return projectsToCleanUp.map(project => execSync(`docker-compose -p ${project} down`, {cwd: this.getModuleDir()}).toString()).join("\n");
  }

  private removeLockFile = () => unlinkSync(this.getLockfileName());
}
