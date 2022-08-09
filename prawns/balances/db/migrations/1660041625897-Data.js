module.exports = class Data1660041625897 {
  name = 'Data1660041625897'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_balance_change_event" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "type" character varying(18) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_baaf218251d290ec2fe0f2b2ff5" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_78c75be2c61be206041fa9b1e5" ON "substrate_balance_change_event" ("account_id") `)
    await db.query(`CREATE TABLE "substrate_balance_transfer" ("id" character varying NOT NULL, "network" character varying(8) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "amount" numeric NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "to_id" character varying NOT NULL, "from_id" character varying NOT NULL, CONSTRAINT "PK_d488f127bbee114b748a65c0a1c" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_e654ea0583a50430430a809e7d" ON "substrate_balance_transfer" ("to_id") `)
    await db.query(`CREATE INDEX "IDX_95971b2db96accf594426e9798" ON "substrate_balance_transfer" ("from_id") `)
    await db.query(`CREATE TABLE "substrate_balance_account" ("id" character varying NOT NULL, "public_key" text NOT NULL, "network" character varying(8) NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "first_balance_change_event_date" TIMESTAMP WITH TIME ZONE, "first_balance_change_event_block_number" numeric, "last_balance_change_event_date" TIMESTAMP WITH TIME ZONE, "last_balance_change_event_block_number" numeric, "total_balance_change_events" integer NOT NULL, "total_transfers" integer NOT NULL, CONSTRAINT "PK_d1d216881f9fb7f16406feb31ac" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_2ef13023685a9ce2632cffb10f" ON "substrate_balance_account" ("public_key") `)
    await db.query(`ALTER TABLE "substrate_balance_change_event" ADD CONSTRAINT "FK_78c75be2c61be206041fa9b1e52" FOREIGN KEY ("account_id") REFERENCES "substrate_balance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_balance_transfer" ADD CONSTRAINT "FK_e654ea0583a50430430a809e7d9" FOREIGN KEY ("to_id") REFERENCES "substrate_balance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "substrate_balance_transfer" ADD CONSTRAINT "FK_95971b2db96accf594426e97982" FOREIGN KEY ("from_id") REFERENCES "substrate_balance_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_balance_change_event"`)
    await db.query(`DROP INDEX "public"."IDX_78c75be2c61be206041fa9b1e5"`)
    await db.query(`DROP TABLE "substrate_balance_transfer"`)
    await db.query(`DROP INDEX "public"."IDX_e654ea0583a50430430a809e7d"`)
    await db.query(`DROP INDEX "public"."IDX_95971b2db96accf594426e9798"`)
    await db.query(`DROP TABLE "substrate_balance_account"`)
    await db.query(`DROP INDEX "public"."IDX_2ef13023685a9ce2632cffb10f"`)
    await db.query(`ALTER TABLE "substrate_balance_change_event" DROP CONSTRAINT "FK_78c75be2c61be206041fa9b1e52"`)
    await db.query(`ALTER TABLE "substrate_balance_transfer" DROP CONSTRAINT "FK_e654ea0583a50430430a809e7d9"`)
    await db.query(`ALTER TABLE "substrate_balance_transfer" DROP CONSTRAINT "FK_95971b2db96accf594426e97982"`)
  }
}
