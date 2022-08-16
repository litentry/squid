module.exports = class Data1660285129568 {
  name = 'Data1660285129568';

  async up(db) {
    await db.query(
      `CREATE TABLE "substrate_identity" ("id" character varying NOT NULL, "account" text NOT NULL, "public_key" text NOT NULL, "network" character varying(8) NOT NULL, "current" boolean NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "action" character varying(5) NOT NULL, "display" text, "email" text, "image" text, "legal" text, "pgp" text, "riot" text, "twitter" text, "web" text, CONSTRAINT "PK_fc61b34e8c000362536766596f0" PRIMARY KEY ("id"))`
    );
    await db.query(
      `CREATE INDEX "IDX_f19eea88a6ee3afd26bc01df13" ON "substrate_identity" ("account") `
    );
    await db.query(
      `CREATE INDEX "IDX_24860a3895121f4a683ed832c4" ON "substrate_identity" ("public_key") `
    );
    await db.query(
      `CREATE INDEX "IDX_541e674278e2cc2cb6b6b934ea" ON "substrate_identity" ("network") `
    );
    await db.query(
      `CREATE INDEX "IDX_365a5e42dddcf902a24cb1f164" ON "substrate_identity" ("current") `
    );
  }

  async down(db) {
    await db.query(`DROP TABLE "substrate_identity"`);
    await db.query(`DROP INDEX "public"."IDX_f19eea88a6ee3afd26bc01df13"`);
    await db.query(`DROP INDEX "public"."IDX_24860a3895121f4a683ed832c4"`);
    await db.query(`DROP INDEX "public"."IDX_541e674278e2cc2cb6b6b934ea"`);
    await db.query(`DROP INDEX "public"."IDX_365a5e42dddcf902a24cb1f164"`);
  }
};
