import {Command} from '@oclif/core'
import axios from "axios";
import {execSync} from "child_process";

export default class accountFromSubscan extends Command {

  private prawn: string = '';
  private chain: string = '';

  static description = 'Index blocks for extrinsics associated with an account on Subscan'

  static examples = [
    `$ devkit index accountFromSubscan polkadot balances 128jkDqxgQ9HMFYQjZvSgGr5hNcZZZbfMSAa7twBp9xEMsMu`,
  ]

  static args = [
    {name: 'chain', description: 'Chain name', required: true},
    {name: 'prawn', description: 'Prawn name', required: true},
    {name: 'account', description: 'Account id', required: true},
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(accountFromSubscan);

    this.prawn = args.prawn;
    this.chain = args.chain;

    const blocks = await this.fetchExtrinsicBlocksForAccount(args.account);

    blocks.forEach((block: number) => {
      console.log(`Indexing block ${block}`);
      console.log(this.indexBlock(block).toString());
    });
  }

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getModuleDir = () => `${this.getProjectRootDir()}/prawns/${this.prawn}`;

  private indexBlock = (block: number) => execSync(`START_BLOCK=${block} END_BLOCK=${block} yarn run dev:${this.chain}`, {cwd: this.getModuleDir()});

  private fetchExtrinsicBlocksForAccount = async (account: string) => (await axios.post('https://polkadot.webapi.subscan.io/api/scan/extrinsics', JSON.stringify({
    "row": 100,
    "page": 0,
    "signed": "signed",
    "address": account,
    "module": "",
    "call": "",
    "no_params": true
  }), {
    headers: {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
  })).data.data.extrinsics.map((extrinsic: { block_num: number }) => extrinsic.block_num).sort((a: number, b: number) => a - b);
}
