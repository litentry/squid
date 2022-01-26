module.exports = class Data1643208987158 {
  name = 'Data1643208987158'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_crowdloan_contribution" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "para_id" integer NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "amount" numeric NOT NULL, "account_id" character varying NOT NULL, "root_account_id" character varying NOT NULL, CONSTRAINT "PK_0bfe0fa389d5c77fe86af6e2020" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_969ecb5b2afb5af95afce8bde1" ON "substrate_crowdloan_contribution" ("network") `)
    await db.query(`CREATE INDEX "IDX_24c59a6f405f99ff54ef5eb9fc" ON "substrate_crowdloan_contribution" ("account_id") `)
    await db.query(`CREATE INDEX "IDX_8d0f06c8229508ab458762dc59" ON "substrate_crowdloan_contribution" ("root_account_id") `)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce" FOREIGN KEY ("account_id") REFERENCES "substrate_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" ADD CONSTRAINT "FK_8d0f06c8229508ab458762dc597" FOREIGN KEY ("root_account_id") REFERENCES "substrate_root_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_crowdloan_contribution"`)
    await db.query(`DROP INDEX "public"."IDX_969ecb5b2afb5af95afce8bde1"`)
    await db.query(`DROP INDEX "public"."IDX_24c59a6f405f99ff54ef5eb9fc"`)
    await db.query(`DROP INDEX "public"."IDX_8d0f06c8229508ab458762dc59"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_24c59a6f405f99ff54ef5eb9fce"`)
    await db.query(`ALTER TABLE "substrate_crowdloan_contribution" DROP CONSTRAINT "FK_8d0f06c8229508ab458762dc597"`)
  }
}
