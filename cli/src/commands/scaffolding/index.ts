import {Command} from '@oclif/core'
import { execSync } from "child_process";
import {readdirSync, unlinkSync} from "fs";

export default class Scaffolding extends Command {

  private module: string = '';

  static description = 'Create database schema scaffolding'

  static examples = [
    `$ devkit scaffolding balances`,
  ]

  static args = [
    {name: 'module', description: 'Module name', required: true}
  ]

  async run(): Promise<void> {
    const {args} = await this.parse(Scaffolding);
    this.module = args.module;
    const oldMigrations = this.getExistingMigrations();
    this.log("Start DB");
    await this.log(this.startDb().toString());
    this.log("Wait for DB to be ready");
    await this.log(this.waitForDb().toString());
    this.log("Create migration");
    await this.log(this.runCreateMigration().toString());
    this.log("Stop DB");
    await this.log(this.stopDb().toString());
    this.log("Delete old migrations");
    oldMigrations.map((oldMigration) => {
      this.log(`- Delete ${oldMigration}`);
      unlinkSync(`${this.getMigrationsDir()}/${oldMigration}`);
    });
    this.log("Complete");
  }

  private getProjectRootDir = () => `${__dirname}/../../../..`;

  private getModuleDir = () => `${this.getProjectRootDir()}/prawns/${this.module}`;

  private getMigrationsDir = () => `${this.getModuleDir()}/db/migrations`;

  private getExistingMigrations = () => readdirSync(this.getMigrationsDir());

  private startDb = () => execSync(`docker run --name "scaffolding-db" -p 5555:5432 -e POSTGRES_HOST_AUTH_METHOD=trust --rm -d postgres:12`, {cwd: this.getProjectRootDir()});

  private waitForDb = () => execSync('while ! nc -z 0.0.0.0 5555; do sleep 1; done;');

  private runCreateMigration = () => execSync(`yarn build && DB_PORT=5555 yarn sqd db:create-migration Data`, {cwd: this.getModuleDir()});

  private stopDb = () => execSync(`docker stop "scaffolding-db"`, {cwd: this.getProjectRootDir()});


}
