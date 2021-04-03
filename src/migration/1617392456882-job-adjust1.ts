import {MigrationInterface, QueryRunner} from "typeorm";

export class jobAdjust11617392456882 implements MigrationInterface {
    name = 'jobAdjust11617392456882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "startDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "endDate" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "endDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "job" ALTER COLUMN "startDate" SET NOT NULL`);
    }

}
