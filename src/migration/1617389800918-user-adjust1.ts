import {MigrationInterface, QueryRunner} from "typeorm";

export class userAdjust11617389800918 implements MigrationInterface {
    name = 'userAdjust11617389800918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "userUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_e4776af8874ddbe15fe57fb87f5" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_e4776af8874ddbe15fe57fb87f5"`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "userUuid"`);
    }

}
