import {Command} from '@oclif/core'
import { execSync } from 'child_process';

export default class Typegen extends Command {

  private module: string = '';
  private chain: string = '';

  static description = 'Generate types for a chain / module'

  static examples = [
    `$ devkit typegen balances polkadot`,
  ]

  static args = [
    {name: 'module', description: 'Module to typegen into', required: true},
    {name: 'chain', description: 'Chain to typegen for', required: true},
    ]

  async run(): Promise<void> {
    const {args} = await this.parse(Typegen);
    this.module = args.module;
    this.chain = args.chain;
    this.log(this.runTypeGen().toString());

  }
  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private runTypeGen = () => execSync(`yarn squid-substrate-typegen ${this.module}/typegen/${this.chain}Typegen.json`, {cwd: this.getProjectRootDir()});
}
