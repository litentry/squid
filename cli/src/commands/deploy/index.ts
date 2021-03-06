import { Command, Flags } from '@oclif/core';
import { execSync } from 'child_process';
import cli from 'cli-ux';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import getProjectIndexingProgress from '../../getProjectIndexingProgress';

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
    this.gitPull();

    this.version = this.getVersion();

    this.log("Create lock file for deployment:");
    this.createLockFile({version: this.version});

    this.log("Start indexing:");
    this.startIndexing();

    let indexingComplete = false;
    let linesToDelete = 0;
    while (!indexingComplete) {
      await this.sleep(10000);
      if (process.stdout.moveCursor) {
        process.stdout.moveCursor(0, linesToDelete * -1);
      }
      const containers = await getProjectIndexingProgress(this.getProjectName());
      indexingComplete = containers.every((container) => container.progress === 100);
      this.log(`Updated at ${new Date().toISOString().replace('T', ' ').substring(11, 19)}`);
      cli.table(containers, { name: {}, progress: {} });
      linesToDelete = containers.length + 3;
    }

    this.log("Indexing complete");

    this.log("Start query node:");
    this.startQueryNode();

    await this.sleep(2000);

    this.log("Reload Nginx:");
    this.reloadNginx();

    this.log("Take down old version:");
    this.takeDownOldVersion();

    await this.sleep(2000);

    this.log("Reload Nginx:");
    this.reloadNginx();

    this.log("Delete lock file:");
    this.removeLockFile();

  }

  private getVersion = () => execSync('git rev-parse --short HEAD').toString().trim();

  private gitPull = () => execSync('git pull', {stdio: 'inherit'});

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getModuleDir = () => `${this.getProjectRootDir()}/prawns/${this.module}`;

  private getDbDataDir = () => `${this.getProjectRootDir()}/data/db/`;

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

  private startIndexing = () => execSync(
    `COMPOSE_PROJECT_NAME=${this.getProjectName()} docker-compose --profile indexing up --build -d`,
    {cwd: this.getModuleDir(), stdio: 'inherit'}
    );

  private startQueryNode = () => execSync(
    `COMPOSE_PROJECT_NAME=${this.getProjectName()} docker-compose --profile querying up --build -d`,
    {cwd: this.getModuleDir(), stdio: 'inherit'}
    );

  private reloadNginx = () => execSync(
    `docker exec $(docker ps -f name=nginx --quiet) /usr/sbin/nginx -s reload`,
    {stdio: 'inherit'}
    );

  private takeDownOldVersion = () => {
    const projects = execSync(`docker ps --filter "label=com.docker.compose.project" -q | xargs docker inspect --format='{{index .Config.Labels "com.docker.compose.project"}}'`).toString().trim().split("\n");

    const projectsToCleanUp = [...new Set(projects)].filter((project: string) => project.startsWith(`${this.module}_`) && project !== this.getProjectName());

    projectsToCleanUp.map(project => {
      this.log(`Take down project: ${project}`);
      execSync(
        `COMPOSE_PROJECT_NAME=${project} docker-compose down`,
        {cwd: this.getModuleDir(), stdio: 'inherit'}
        );

      this.log(`Delete data for project: ${project}`);
      execSync(
        `sudo rm -rf ${project}`,
        {cwd: this.getDbDataDir(), stdio: 'inherit'}
      );
    })
  }

  private removeLockFile = () => unlinkSync(this.getLockfileName());
}
