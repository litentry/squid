module.exports = class Data1647961108047 {
  name = 'Data1647961108047'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_tipper" ("id" character varying NOT NULL, "account" text NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "block_number" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "tip_value" numeric NOT NULL, "tip_id" character varying NOT NULL, CONSTRAINT "PK_89c8abf809b2e63b5168cec95de" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_f2ccf4393edfa8de23ea70ab3e" ON "substrate_tipper" ("account") `)
    await db.query(`CREATE INDEX "IDX_ce29bcc2e528a1c656fa270945" ON "substrate_tipper" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_53d3c5641f5b01c4f68a1a5101" ON "substrate_tipper" ("network") `)
    await db.query(`CREATE INDEX "IDX_b398f0038263207602e68a6fa5" ON "substrate_tipper" ("tip_id") `)
    await db.query(`CREATE TABLE "substrate_tip" ("id" character varying NOT NULL, "account" text NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "block_number" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "status" character varying(9) NOT NULL, "who" text NOT NULL, "finder" text, "reason" text NOT NULL, "tip_value" numeric, "deposit" numeric, "closes" numeric, CONSTRAINT "PK_47a6dc052349ff9e667731bf1dd" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_46bae9c2dc453e7f1c8efac259" ON "substrate_tip" ("account") `)
    await db.query(`CREATE INDEX "IDX_2b9f613c49303fc619d277ef2e" ON "substrate_tip" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_f7b0dd9b09b4204c081e647792" ON "substrate_tip" ("network") `)
    await db.query(`ALTER TABLE "substrate_tipper" ADD CONSTRAINT "FK_b398f0038263207602e68a6fa58" FOREIGN KEY ("tip_id") REFERENCES "substrate_tip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_tipper"`)
    await db.query(`DROP INDEX "public"."IDX_f2ccf4393edfa8de23ea70ab3e"`)
    await db.query(`DROP INDEX "public"."IDX_ce29bcc2e528a1c656fa270945"`)
    await db.query(`DROP INDEX "public"."IDX_53d3c5641f5b01c4f68a1a5101"`)
    await db.query(`DROP INDEX "public"."IDX_b398f0038263207602e68a6fa5"`)
    await db.query(`DROP TABLE "substrate_tip"`)
    await db.query(`DROP INDEX "public"."IDX_46bae9c2dc453e7f1c8efac259"`)
    await db.query(`DROP INDEX "public"."IDX_2b9f613c49303fc619d277ef2e"`)
    await db.query(`DROP INDEX "public"."IDX_f7b0dd9b09b4204c081e647792"`)
    await db.query(`ALTER TABLE "substrate_tipper" DROP CONSTRAINT "FK_b398f0038263207602e68a6fa58"`)
  }
}
