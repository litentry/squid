module.exports = class Data1642769225031 {
  name = 'Data1642769225031'

  async up(db) {
    await db.query(`ALTER TABLE "khala_transfer" ADD "tip" numeric NOT NULL`)
    await db.query(`ALTER TABLE "khala_account" ADD "balance" numeric NOT NULL`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "khala_transfer" DROP COLUMN "tip"`)
    await db.query(`ALTER TABLE "khala_account" DROP COLUMN "balance"`)
  }
}
