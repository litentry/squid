module.exports = class Data1642606995204 {
  name = 'Data1642606995204'

  async up(db) {
    await db.query(`CREATE TABLE "khala_vote" ("id" character varying NOT NULL, "block_number" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_d12320c0bcf52b38f4cc65e89af" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_a83151a1edc11f3c6dca1add33" ON "khala_vote" ("account_id") `)
    await db.query(`ALTER TABLE "khala_account" ADD "total_votes" integer`)
    await db.query(`ALTER TABLE "khala_vote" ADD CONSTRAINT "FK_a83151a1edc11f3c6dca1add33b" FOREIGN KEY ("account_id") REFERENCES "khala_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "khala_vote"`)
    await db.query(`DROP INDEX "public"."IDX_a83151a1edc11f3c6dca1add33"`)
    await db.query(`ALTER TABLE "khala_account" DROP COLUMN "total_votes"`)
    await db.query(`ALTER TABLE "khala_vote" DROP CONSTRAINT "FK_a83151a1edc11f3c6dca1add33b"`)
  }
}
