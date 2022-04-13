module.exports = class Data1649868972554 {
  name = 'Data1649868972554'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_treasury_awarded" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "account_balance_at_block" numeric NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "depositor_id" character varying NOT NULL, CONSTRAINT "PK_91b2f8d564f94fc2b50c762e6ab" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_bca5e3fbe9294d45ec19b1aa63" ON "substrate_treasury_awarded" ("depositor_id") `)
    await db.query(`ALTER TABLE "substrate_treasury_awarded" ADD CONSTRAINT "FK_bca5e3fbe9294d45ec19b1aa638" FOREIGN KEY ("depositor_id") REFERENCES "substrate_balance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_treasury_awarded"`)
    await db.query(`DROP INDEX "public"."IDX_bca5e3fbe9294d45ec19b1aa63"`)
    await db.query(`ALTER TABLE "substrate_treasury_awarded" DROP CONSTRAINT "FK_bca5e3fbe9294d45ec19b1aa638"`)
  }
}
