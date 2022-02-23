import {Command} from '@oclif/core'
import { execSync } from 'child_process';
import config from '../../config';

export default class Explore extends Command {

  private chain: string = '';

  static description = 'Generate metadata for a chain'

  static examples = [
    `$ devkit explore polkadot`,
  ]

  static args = [
    {name: 'chain', description: 'Chain to explore', required: true},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(Explore);
    this.chain = args.chain;
    if (!(this.chain in config.chains)) {
      this.error(`No config found for chain ${this.chain}`);
    }
    const chainConfig = config.chains[this.chain as 'kusama' | 'khala' | 'polkadot'];
    this.log(this.runExplore(chainConfig).toString());
  }

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private runExplore = (chainConfig: {chain: string, archive: string}) => execSync(`yarn squid-substrate-metadata-explorer \
		--chain ${chainConfig.chain} \
		--archive ${chainConfig.archive} \
		--out metadata/${this.chain}Versions.json`, {cwd: this.getProjectRootDir()});
}
