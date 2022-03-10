module.exports = class Data1646136602378 {
  name = 'Data1646136602378'

  async up(db) {
    await db.query(`CREATE TABLE "substrate_identity" ("id" character varying NOT NULL, "account" text NOT NULL, "root_account" text NOT NULL, "network" character varying(8) NOT NULL, "current" boolean NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "display" text, "email" text, "image" text, "legal" text, "pgp" text, "riot" text, "twitter" text, "web" text, CONSTRAINT "PK_fc61b34e8c000362536766596f0" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_f19eea88a6ee3afd26bc01df13" ON "substrate_identity" ("account") `)
    await db.query(`CREATE INDEX "IDX_cbf34f268c99fabb96057c997a" ON "substrate_identity" ("root_account") `)
    await db.query(`CREATE INDEX "IDX_541e674278e2cc2cb6b6b934ea" ON "substrate_identity" ("network") `)
    await db.query(`CREATE INDEX "IDX_365a5e42dddcf902a24cb1f164" ON "substrate_identity" ("current") `)
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_identity"`)
    await db.query(`DROP INDEX "public"."IDX_f19eea88a6ee3afd26bc01df13"`)
    await db.query(`DROP INDEX "public"."IDX_cbf34f268c99fabb96057c997a"`)
    await db.query(`DROP INDEX "public"."IDX_541e674278e2cc2cb6b6b934ea"`)
    await db.query(`DROP INDEX "public"."IDX_365a5e42dddcf902a24cb1f164"`)
  }
}
