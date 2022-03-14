import { Command } from '@oclif/core';
import { createWriteStream, existsSync } from 'fs';
import { execSync } from 'child_process';
import * as AWS from 'aws-sdk';
import config from '../../config';
import * as StreamPromises from "stream/promises";

const s3 = new AWS.S3();

export default class DownloadSnapshot extends Command {

  private prawn: string = '';
  private version: string = '';

  static description = 'Download a snapshot of a prawn';

  static examples = [
    `$ devkit snapshot download balances`
  ];

  static args = [{ name: 'prawn', description: 'Prawn to snapshot', required: true }];

  async run(): Promise<void> {
    const { args } = await this.parse(DownloadSnapshot);
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
  }

  private getVersion = () => execSync('git rev-parse --short HEAD').toString().trim();

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getPrawnDir = () => `${this.getProjectRootDir()}/prawns/${this.prawn}`;

  private getDbDataDir = () => `${this.getProjectRootDir()}/data/db/`;

  private prawnExists = () => existsSync(this.getPrawnDir());

  private getProjectName = () => `${this.prawn}_${this.version}`;

  private getSnapshotName = () => `${this.getProjectName()}.tar.gz`;

  private snapshotExists = () => existsSync(`${this.getDbDataDir()}/${this.getProjectName()}`);

  private downloadSnapshot = async () => {
    const targetFilePath = `${this.getDbDataDir()}/${this.getSnapshotName()}`;
    const params = {
      Bucket: config.snapshot.s3.bucket,
      Key: `${config.snapshot.s3.bucket}/${this.getSnapshotName()}`,
    };
    const readStream = s3.getObject(params).createReadStream();
    const writeStream = createWriteStream(targetFilePath);
    await StreamPromises.pipeline(readStream, writeStream);
  };

  private extractSnapshot = () => execSync(
    `tar -xf ${this.getSnapshotName()}`,
    { cwd: this.getDbDataDir(), stdio: 'inherit' }
  );
}