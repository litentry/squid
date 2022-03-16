import { Command } from '@oclif/core';
import { existsSync, rmSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import getProjectIndexingProgress from '../../getProjectIndexingProgress';
import cli from 'cli-ux';
import { promises as fs } from 'fs';
import * as AWS from 'aws-sdk';
import config from  '../../config';

const s3 = new AWS.S3();

export default class MakeSnapshot extends Command {

  private prawn: string = '';
  private version: string = '';

  static description = 'Make a snapshot of a prawn';

  static examples = [
    `$ devkit snapshot make balances`
  ];

  static args = [{ name: 'prawn', description: 'Prawn to snapshot', required: true }];

  async run(): Promise<void> {
    const { args } = await this.parse(MakeSnapshot);
    this.prawn = args.prawn;

    if (!this.prawnExists()) {
      return this.error(`Prawn ${this.prawn} does not exist`);
    }

    this.log('Pull latest changes:');
    this.gitPull();

    this.version = this.getVersion();

    this.log('Start indexing:');
    this.startIndexing();

    let indexingComplete = false;
    let linesToDelete = 0;
    while (!indexingComplete) {
      await this.sleep(10000);
      process.stdout.moveCursor(0, linesToDelete * -1);
      const containers = await getProjectIndexingProgress(this.getProjectName());
      indexingComplete = containers.every((container) => container.progress === 1);
      this.log(`Updated at ${new Date().toISOString().replace('T', ' ').substring(11, 19)}`);
      cli.table(containers, { name: {}, progress: {} });
      linesToDelete = containers.length + 3;
    }

    this.log('Indexing complete');

    this.log('Stop indexers and database');
    this.stopIndexing();

    await this.sleep(2000);

    this.log('Create tarball');
    this.createTarball();

    this.log('Upload snapshot');
    await this.uploadSnapshot();

    this.log('Delete db data');
    this.deleteDbData();

    this.log(`Successfully created a snapshot of ${this.getSnapshotName()}`);
  }

  private getVersion = () => execSync('git rev-parse --short HEAD').toString().trim();

  private gitPull = () => execSync('git pull', { stdio: 'inherit' });

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getPrawnDir = () => `${this.getProjectRootDir()}/prawns/${this.prawn}`;

  private getDbDataDir = () => `${this.getProjectRootDir()}/data/db`;

  private prawnExists = () => existsSync(this.getPrawnDir());

  private sleep = (time: number) => new Promise(r => setTimeout(r, time));

  private getProjectName = () => `${this.prawn}_${this.version}`;

  private getSnapshotName = () => `${this.getProjectName()}.tar.gz`;

  private startIndexing = () => execSync(
    `COMPOSE_PROJECT_NAME=${this.getProjectName()} docker-compose --profile indexing up -d`,
    { cwd: this.getPrawnDir(), stdio: 'inherit' }
  );

  private stopIndexing = () => execSync(
    `COMPOSE_PROJECT_NAME=${this.getProjectName()} docker-compose down`,
    { cwd: this.getPrawnDir(), stdio: 'inherit' }
  );

  private createTarball = () => execSync(
    `tar -zcvf ${this.getSnapshotName()} ${this.getProjectName()}`,
    { cwd: this.getDbDataDir(), stdio: 'inherit' }
  );

  private uploadSnapshot = async () => {
    const fileName = `${this.getDbDataDir()}/${this.getSnapshotName()}`;
    const data = await fs.readFile(fileName);
    const params = {
      Bucket: config.snapshot.s3.bucket,
      Key: `${config.snapshot.s3.path}/${this.getSnapshotName()}`,
      Body: data,
      ContentEncoding: 'application/x-compressed-tar'
    };
    await s3.upload(params).promise();
  };

  private deleteDbData = () => {
    execSync(`rm ${this.getSnapshotName()}`,
      { cwd: this.getDbDataDir(), stdio: 'inherit' }
    ); //Delete tar.gz file
    execSync(`sudo rm -rf ${this.getProjectName()}`,
      { cwd: this.getDbDataDir(), stdio: 'inherit' }
      ); //Delete db folder
  };
}
