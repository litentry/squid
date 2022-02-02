module.exports = class Data1643803306163 {
  name = 'Data1643803306163'

  async up(db) {
    await db.query(`ALTER TABLE "substrate_account" ADD "total_crowdloan_contributions" integer`)
  }

  async down(db) {
    await db.query(`ALTER TABLE "substrate_account" DROP COLUMN "total_crowdloan_contributions"`)
  }
}
