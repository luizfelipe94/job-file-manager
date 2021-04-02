import {MigrationInterface, QueryRunner} from "typeorm";

export class fileAdjust21617369509280 implements MigrationInterface {
    name = 'fileAdjust21617369509280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd" FOREIGN KEY ("folderUuid") REFERENCES "folder"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd"`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd" FOREIGN KEY ("folderUuid") REFERENCES "folder"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
