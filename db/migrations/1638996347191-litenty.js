const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class litenty1638996347191 {
    name = 'litenty1638996347191'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "identity" ("id" character varying NOT NULL, "address" text NOT NULL, "deposit" numeric NOT NULL, "display" text NOT NULL, "legal" text, "web" text, "riot" text, "email" text, "image" text, "twitter" text, "pgp_fingerprint" text, "additional" text array, CONSTRAINT "PK_ff16a44186b286d5e626178f726" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "identity"`);
    }
}
