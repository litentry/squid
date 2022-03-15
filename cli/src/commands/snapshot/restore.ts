import { Command } from '@oclif/core';
import { existsSync, promises as fs } from 'fs';
import { execSync } from 'child_process';
import * as AWS from 'aws-sdk';
import config from '../../config';

const s3 = new AWS.S3();

export default class RestoreSnapshot extends Command {

  private prawn: string = '';
  private version: string = '';

  static description = 'Restore a snapshot of a prawn';

  static examples = [
    `$ devkit snapshot restore balances`
  ];

  static args = [{ name: 'prawn', description: 'Prawn to snapshot', required: true }];

  async run(): Promise<void> {
    const { args } = await this.parse(RestoreSnapshot);
    this.prawn = args.prawn;

    if (!this.prawnExists()) {
      return this.error(`Prawn ${this.prawn} does not exist`);
    }

    this.version = this.getVersion();

    if (this.snapshotExists()) {
      return this.error(`Prawn ${this.getSnapshotName()} already exists in ${this.getDbDataDir()}`);
    }

    this.log("Download snapshot:");
    await this.downloadSnapshot();

    this.log("Extract snapshot:");
    await this.extractSnapshot();

    this.log(`Successfully restored snapshot ${this.getSnapshotName()}`);
  }

  private getVersion = () => execSync('git rev-parse --short HEAD').toString().trim();

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getPrawnDir = () => `${this.getProjectRootDir()}/prawns/${this.prawn}`;

  private getDbDataDir = () => `${this.getProjectRootDir()}/data/db`;

  private prawnExists = () => existsSync(this.getPrawnDir());

  private getProjectName = () => `${this.prawn}_${this.version}`;

  private getSnapshotName = () => `${this.getProjectName()}.tar.gz`;

  private snapshotExists = () => existsSync(`${this.getDbDataDir()}/${this.getProjectName()}`);

  private downloadSnapshot = async () => {
    const targetFilePath = `${this.getDbDataDir()}/${this.getSnapshotName()}`;
    const params = {
      Bucket: config.snapshot.s3.bucket,
      Key: `${config.snapshot.s3.path}/${this.getSnapshotName()}`,
    };
    const { Body } = await s3.getObject(params).promise()
    await fs.writeFile(targetFilePath, Body!.toString());
  };

  private extractSnapshot = () => execSync(
    `tar -xf ${this.getSnapshotName()}`,
    { cwd: this.getDbDataDir(), stdio: 'inherit' }
  );
}
