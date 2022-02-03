module.exports = class Data1643901457385 {
  name = 'Data1643901457385'

  async up(db) {
    await db.query(`ALTER TABLE "substrate_balance" DROP CONSTRAINT "FK_ed0d7c615470de64e37bcf9afe7"`)
    await db.query(`ALTER TABLE "substrate_vote" DROP CONSTRAINT "FK_a53c92e2ddcac33c57ee2565b49"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_8d0f06c8229508ab458762dc597"`)
    await db.query(`ALTER TABLE "substrate_account" DROP CONSTRAINT "FK_3c18120b0899dd29f0dc3a9508c"`)
    await db.query(`DROP INDEX "public"."IDX_ed0d7c615470de64e37bcf9afe"`)
    await db.query(`DROP INDEX "public"."IDX_a53c92e2ddcac33c57ee2565b4"`)
    await db.query(`DROP INDEX "public"."IDX_8d0f06c8229508ab458762dc59"`)
    await db.query(`DROP INDEX "public"."IDX_3c18120b0899dd29f0dc3a9508"`)
    await db.query(`ALTER TABLE "substrate_balance" RENAME COLUMN "root_account_id" TO "root_account"`)
    await db.query(`ALTER TABLE "substrate_vote" RENAME COLUMN "root_account_id" TO "root_account"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" RENAME COLUMN "root_account_id" TO "root_account"`)
    await db.query(`ALTER TABLE "substrate_account" RENAME COLUMN "root_account_id" TO "root_account"`)
    await db.query(`ALTER TABLE "substrate_balance" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_balance" ADD "root_account" text NOT NULL`)
    await db.query(`ALTER TABLE "substrate_vote" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_vote" ADD "root_account" text NOT NULL`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD "root_account" text NOT NULL`)
    await db.query(`ALTER TABLE "substrate_account" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_account" ADD "root_account" text NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "substrate_balance" ADD CONSTRAINT "FK_ed0d7c615470de64e37bcf9afe7" FOREIGN KEY ("root_account_id") REFERENCES "substrate_root_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_vote" ADD CONSTRAINT "FK_a53c92e2ddcac33c57ee2565b49" FOREIGN KEY ("root_account_id") REFERENCES "substrate_root_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_8d0f06c8229508ab458762dc597" FOREIGN KEY ("root_account_id") REFERENCES "substrate_root_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_account" ADD CONSTRAINT "FK_3c18120b0899dd29f0dc3a9508c" FOREIGN KEY ("root_account_id") REFERENCES "substrate_root_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`CREATE INDEX "IDX_ed0d7c615470de64e37bcf9afe" ON "substrate_balance" ("root_account_id") `)
    await db.query(`CREATE INDEX "IDX_a53c92e2ddcac33c57ee2565b4" ON "substrate_vote" ("root_account_id") `)
    await db.query(`CREATE INDEX "IDX_8d0f06c8229508ab458762dc59" ON "substrate_crowdloan_contribution" ("root_account_id") `)
    await db.query(`CREATE INDEX "IDX_3c18120b0899dd29f0dc3a9508" ON "substrate_account" ("root_account_id") `)
    await db.query(`ALTER TABLE "substrate_balance" RENAME COLUMN "root_account" TO "root_account_id"`)
    await db.query(`ALTER TABLE "substrate_vote" RENAME COLUMN "root_account" TO "root_account_id"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" RENAME COLUMN "root_account" TO "root_account_id"`)
    await db.query(`ALTER TABLE "substrate_account" RENAME COLUMN "root_account" TO "root_account_id"`)
    await db.query(`ALTER TABLE "substrate_balance" ADD "root_account" character varying NOT NULL`)
    await db.query(`ALTER TABLE "substrate_balance" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_vote" ADD "root_account" character varying NOT NULL`)
    await db.query(`ALTER TABLE "substrate_vote" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD "root_account" character varying NOT NULL`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP COLUMN "root_account"`)
    await db.query(`ALTER TABLE "substrate_account" ADD "root_account" character varying NOT NULL`)
    await db.query(`ALTER TABLE "substrate_account" DROP COLUMN "root_account"`)
  }
}
