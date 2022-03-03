module.exports = class Data1646316890434 {
  name = 'Data1646316890434'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_erc20" ("id" character varying NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, CONSTRAINT "PK_5e8bd563e2c2e6ae83cfc1ecbc5" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_746356f006caf906ccaf3ee9b4" ON "substrate_erc20" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_0e6d617deac2ab0475f6e65f7f" ON "substrate_erc20" ("network") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_erc20"`)
    await db.query(`DROP INDEX "public"."IDX_746356f006caf906ccaf3ee9b4"`)
    await db.query(`DROP INDEX "public"."IDX_0e6d617deac2ab0475f6e65f7f"`)
  }
}
