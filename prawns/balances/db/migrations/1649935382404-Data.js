module.exports = class Data1649935382404 {
  name = 'Data1649935382404'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_balance_set" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "account_balance_at_block" numeric NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "depositor_id" character varying NOT NULL, CONSTRAINT "PK_e7f8f964b08c6aabcdd86f2c83e" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_34b6f0ffcb106154421daf89cf" ON "substrate_balance_set" ("depositor_id") `)
    await db.query(`ALTER TABLE "substrate_balance_set" ADD CONSTRAINT "FK_34b6f0ffcb106154421daf89cf4" FOREIGN KEY ("depositor_id") REFERENCES "substrate_balance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_balance_set"`)
    await db.query(`DROP INDEX "public"."IDX_34b6f0ffcb106154421daf89cf"`)
    await db.query(`ALTER TABLE "substrate_balance_set" DROP CONSTRAINT "FK_34b6f0ffcb106154421daf89cf4"`)
  }
}
