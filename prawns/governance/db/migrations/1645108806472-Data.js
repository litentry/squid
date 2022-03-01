module.exports = class Data1645108806472 {
  name = 'Data1645108806472'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_vote" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "root_account" text NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_c11d850f7f695e6e55327b45360" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_8582455a30a8be505b5a63e76e" ON "substrate_vote" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_476ba77386d8ac8805292f0c92" ON "substrate_vote" ("root_account") `)
    await db.query(`CREATE TABLE "substrate_governance_account" ("id" character varying NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "total_votes" integer NOT NULL, CONSTRAINT "PK_ccd1f23a87828f4ee8eb38e9fb7" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_21097df62963e6b1d6a813e952" ON "substrate_governance_account" ("root_account") `)
    await db.query(`ALTER TABLE "substrate_vote" ADD CONSTRAINT "FK_8582455a30a8be505b5a63e76e1" FOREIGN KEY ("account_id") REFERENCES "substrate_governance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_vote"`)
    await db.query(`DROP INDEX "public"."IDX_8582455a30a8be505b5a63e76e"`)
    await db.query(`DROP INDEX "public"."IDX_476ba77386d8ac8805292f0c92"`)
    await db.query(`DROP TABLE "substrate_governance_account"`)
    await db.query(`DROP INDEX "public"."IDX_21097df62963e6b1d6a813e952"`)
    await db.query(`ALTER TABLE "substrate_vote" DROP CONSTRAINT "FK_8582455a30a8be505b5a63e76e1"`)
  }
}
