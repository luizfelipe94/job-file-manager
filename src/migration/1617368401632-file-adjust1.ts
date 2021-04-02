import {MigrationInterface, QueryRunner} from "typeorm";

export class fileAdjust11617368401632 implements MigrationInterface {
    name = 'fileAdjust11617368401632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "s3path" TO "path"`);
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "path" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ALTER COLUMN "path" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" RENAME COLUMN "path" TO "s3path"`);
    }

}
