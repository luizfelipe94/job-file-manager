import {MigrationInterface, QueryRunner} from "typeorm";

export class jobcheckpointAdjust11617464014528 implements MigrationInterface {
    name = 'jobcheckpointAdjust11617464014528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_checkpoint" RENAME COLUMN "batchId" TO "date"`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_checkpoint" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" ADD "date" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" RENAME COLUMN "date" TO "batchId"`);
    }

}
