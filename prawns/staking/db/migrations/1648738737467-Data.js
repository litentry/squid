module.exports = class Data1648738737467 {
  name = 'Data1648738737467'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_staking_actions" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "root_account" text NOT NULL, "block_number" numeric NOT NULL, "stash" text NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "action" text NOT NULL, "amount" numeric, "account_id" character varying NOT NULL, CONSTRAINT "PK_d76ba8dbc277ef53e04da5bcdbf" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_ceeaeeaa3d6f3a8fe0f924da88" ON "substrate_staking_actions" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_af18890a0dbd2fa6706ac1b8d8" ON "substrate_staking_actions" ("root_account") `)
    await db.query(`CREATE TABLE "substrate_staking_account" ("id" character varying NOT NULL, "account" text NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, CONSTRAINT "PK_30809a7b00b1dbfa7d5223980df" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_022cd9fa8d429d4254b1747776" ON "substrate_staking_account" ("account") `)
    await db.query(`CREATE INDEX "IDX_96e3ce13199f9012e0fa38d693" ON "substrate_staking_account" ("root_account") `)
    await db.query(`ALTER TABLE "substrate_staking_actions" ADD CONSTRAINT "FK_ceeaeeaa3d6f3a8fe0f924da88d" FOREIGN KEY ("account_id") REFERENCES "substrate_staking_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_staking_actions"`)
    await db.query(`DROP INDEX "public"."IDX_ceeaeeaa3d6f3a8fe0f924da88"`)
    await db.query(`DROP INDEX "public"."IDX_af18890a0dbd2fa6706ac1b8d8"`)
    await db.query(`DROP TABLE "substrate_staking_account"`)
    await db.query(`DROP INDEX "public"."IDX_022cd9fa8d429d4254b1747776"`)
    await db.query(`DROP INDEX "public"."IDX_96e3ce13199f9012e0fa38d693"`)
    await db.query(`ALTER TABLE "substrate_staking_actions" DROP CONSTRAINT "FK_ceeaeeaa3d6f3a8fe0f924da88d"`)
  }
}
