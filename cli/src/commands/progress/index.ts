import {Command} from '@oclif/core'
import cli from 'cli-ux'
import getProjectIndexingProgress from '../../getProjectIndexingProgress';

export default class Progress extends Command {

  private projectName: string = '';

  static description = 'Get indexing progress of a module'

  static examples = [
    `$ oex progress balances_a4e321`,
  ]

  static args = [
    {name: 'projectName', description: 'Project name', required: true}
    ]

  async run(): Promise<void> {
    const {args} = await this.parse(Progress);
    this.projectName = args.projectName;
    const indexingProgress = await getProjectIndexingProgress(this.projectName);
    cli.table(indexingProgress, {name: {}, progress: {}});
  }



}
