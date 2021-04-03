import {MigrationInterface, QueryRunner} from "typeorm";

export class jobAdjust21617392646961 implements MigrationInterface {
    name = 'jobAdjust21617392646961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "job_status_enum" RENAME TO "job_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "job_status_enum" AS ENUM('created', 'success', 'failed', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "status" TYPE "job_status_enum" USING "status"::"text"::"job_status_enum"`);
        await queryRunner.query(`DROP TYPE "job_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "job_status_enum_old" AS ENUM('waiting', 'success', 'failed', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "status" TYPE "job_status_enum_old" USING "status"::"text"::"job_status_enum_old"`);
        await queryRunner.query(`DROP TYPE "job_status_enum"`);
        await queryRunner.query(`ALTER TYPE "job_status_enum_old" RENAME TO "job_status_enum"`);
    }

}
