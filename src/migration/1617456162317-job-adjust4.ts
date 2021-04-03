import {MigrationInterface, QueryRunner} from "typeorm";

export class jobAdjust41617456162317 implements MigrationInterface {
    name = 'jobAdjust41617456162317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" ADD "encoding" character varying(256) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "encoding"`);
    }

}
