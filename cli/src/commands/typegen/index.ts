import { Command } from '@oclif/core'
import { execSync } from 'child_process';
import { readdirSync } from "fs";

export default class Typegen extends Command {

  private prawn: string = '';

  static description = 'Generate types for a prawn'

  static examples = [
    `$ devkit typegen balances`,
  ]

  static args = [
    {name: 'prawn', description: 'Module to typegen into', required: true}
    ]

  async run(): Promise<void> {
    const {args} = await this.parse(Typegen);
    this.prawn = args.prawn;
    this.getChains().forEach((chain) => {
      console.log(`Running type generation for ${chain}`);
      this.log(this.runTypeGen(chain).toString());
    })
  }
  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getChains = () => {
    const typgenFiles = readdirSync(`${this.getProjectRootDir()}/prawns/${this.prawn}/typegen/`, {withFileTypes: true});
    const regex = /([a-z]+)Typegen\.json/;
    return typgenFiles.reduce((all: string[], curr) => {
      const matches = regex.exec(curr.name);
      if (matches === null) {
        return all;
      }
      return [...all, matches[1]];
    }, []);
  }

  private runTypeGen = (chain: string) => execSync(`yarn squid-substrate-typegen prawns/${this.prawn}/typegen/${chain}Typegen.json`, {cwd: this.getProjectRootDir()});
}
