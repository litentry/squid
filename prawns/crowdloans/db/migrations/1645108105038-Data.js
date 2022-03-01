module.exports = class Data1645108105038 {
  name = 'Data1645108105038'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_crowdloan_contribution" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "root_account" text NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "para_id" integer NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "amount" numeric NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_0bfe0fa389d5c77fe86af6e2020" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_24c59a6f405f99ff54ef5eb9fc" ON "substrate_crowdloan_contribution" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_f4eacbe3132d59eec5ac98a3bc" ON "substrate_crowdloan_contribution" ("root_account") `)
    await db.query(`CREATE TABLE "substrate_crowdloan_contribution_account" ("id" character varying NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "total_crowdloan_contributions" integer NOT NULL, CONSTRAINT "PK_24c59a6f405f99ff54ef5eb9fce" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_8c36082a7f0734207c731855da" ON "substrate_crowdloan_contribution_account" ("root_account") `)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce" FOREIGN KEY ("account_id") REFERENCES "substrate_crowdloan_contribution_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_crowdloan_contribution"`)
    await db.query(`DROP INDEX "public"."IDX_24c59a6f405f99ff54ef5eb9fc"`)
    await db.query(`DROP INDEX "public"."IDX_f4eacbe3132d59eec5ac98a3bc"`)
    await db.query(`DROP TABLE "substrate_crowdloan_contribution_account"`)
    await db.query(`DROP INDEX "public"."IDX_8c36082a7f0734207c731855da"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce"`)
  }
}
