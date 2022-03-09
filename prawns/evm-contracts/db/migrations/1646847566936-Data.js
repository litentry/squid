module.exports = class Data1646847566936 {
  name = 'Data1646847566936'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_evm_contract_signature" ("id" character varying NOT NULL, "contract_type" text NOT NULL, "signature_id" text NOT NULL, "signature_name" text, "signature_type" text NOT NULL, "network" character varying(8) NOT NULL, "contract_id" character varying NOT NULL, CONSTRAINT "PK_d000b5ea4754648d6e55d25eb19" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9ee6a77e11cf56fa262f3f6d42" ON "substrate_evm_contract_signature" ("contract_id") `)
    await db.query(`CREATE INDEX "IDX_b739760d1396ed03287f0bad9a" ON "substrate_evm_contract_signature" ("contract_type") `)
    await db.query(`CREATE INDEX "IDX_37ce9ad369f3d89aba6764545c" ON "substrate_evm_contract_signature" ("signature_id") `)
    await db.query(`CREATE INDEX "IDX_700b1584f0ba0d75b4edac90c8" ON "substrate_evm_contract_signature" ("signature_name") `)
    await db.query(`CREATE INDEX "IDX_479f6b956aaf5377a012d9c29b" ON "substrate_evm_contract_signature" ("network") `)
    await db.query(`CREATE TABLE "substrate_evm_contract" ("id" character varying NOT NULL, "type" text NOT NULL, "evm_tx_hash" text NOT NULL, "network" character varying(8) NOT NULL, CONSTRAINT "PK_9c9387cadded49d8892be463ea4" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9074699245795b4b08e7757f33" ON "substrate_evm_contract" ("type") `)
    await db.query(`CREATE UNIQUE INDEX "IDX_38c7db432745b874b741ba11fd" ON "substrate_evm_contract" ("evm_tx_hash") `)
    await db.query(`CREATE INDEX "IDX_6e0f7bcc7e33bb21141b0cf5f7" ON "substrate_evm_contract" ("network") `)
    await db.query(`ALTER TABLE "substrate_evm_contract_signature" ADD CONSTRAINT "FK_9ee6a77e11cf56fa262f3f6d423" FOREIGN KEY ("contract_id") REFERENCES "substrate_evm_contract"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_evm_contract_signature"`)
    await db.query(`DROP INDEX "public"."IDX_9ee6a77e11cf56fa262f3f6d42"`)
    await db.query(`DROP INDEX "public"."IDX_b739760d1396ed03287f0bad9a"`)
    await db.query(`DROP INDEX "public"."IDX_37ce9ad369f3d89aba6764545c"`)
    await db.query(`DROP INDEX "public"."IDX_700b1584f0ba0d75b4edac90c8"`)
    await db.query(`DROP INDEX "public"."IDX_479f6b956aaf5377a012d9c29b"`)
    await db.query(`DROP TABLE "substrate_evm_contract"`)
    await db.query(`DROP INDEX "public"."IDX_9074699245795b4b08e7757f33"`)
    await db.query(`DROP INDEX "public"."IDX_38c7db432745b874b741ba11fd"`)
    await db.query(`DROP INDEX "public"."IDX_6e0f7bcc7e33bb21141b0cf5f7"`)
    await db.query(`ALTER TABLE "substrate_evm_contract_signature" DROP CONSTRAINT "FK_9ee6a77e11cf56fa262f3f6d423"`)
  }
}
