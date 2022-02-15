module.exports = class Data1644879763105 {
  name = 'Data1644879763105'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_treasury_deposit" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "account_balance_at_block" numeric NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d79dce4ef536dbd248fd23c3493" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_d75c3092dd2e435e80f30e0592" ON "substrate_treasury_deposit" ("network") `)
    await db.query(`CREATE INDEX "IDX_25ea12ca9e223205b9317d9f68" ON "substrate_balance" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_476ba77386d8ac8805292f0c92" ON "substrate_vote" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_f4eacbe3132d59eec5ac98a3bc" ON "substrate_crowdloan_contribution" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_3f70e0536809397fd233d5f0c9" ON "substrate_account" ("root_account") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_treasury_deposit"`)
    await db.query(`DROP INDEX "public"."IDX_d75c3092dd2e435e80f30e0592"`)
    await db.query(`DROP INDEX "public"."IDX_25ea12ca9e223205b9317d9f68"`)
    await db.query(`DROP INDEX "public"."IDX_476ba77386d8ac8805292f0c92"`)
    await db.query(`DROP INDEX "public"."IDX_f4eacbe3132d59eec5ac98a3bc"`)
    await db.query(`DROP INDEX "public"."IDX_3f70e0536809397fd233d5f0c9"`)
  }
}
