import {MigrationInterface, QueryRunner} from "typeorm";

export class init1617232130696 implements MigrationInterface {
    name = 'init1617232130696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenant" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "description" character varying(2000) NOT NULL, "jobConfigs" jsonb NOT NULL DEFAULT '[]', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "PK_065d899dce9195dfb9d4e461a28" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "role" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_16fc336b9576146aa1f03fdc7c5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "tenantUuid" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "folder" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "description" character varying(1000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "userUuid" uuid, CONSTRAINT "PK_00d7f9e5eb7f1a65bbbdbb0ce67" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "job_checkpoint_status_enum" AS ENUM('registered', 'retentive', 'failed')`);
        await queryRunner.query(`CREATE TABLE "job_checkpoint" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "batchId" integer NOT NULL DEFAULT '0', "message" character varying(2000) NOT NULL, "status" "job_checkpoint_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "jobUuid" uuid, CONSTRAINT "PK_44aee127cc27ca4998ee3f59b89" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "job_result" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "result" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "jobUuid" uuid, CONSTRAINT "PK_f1ee69c015415f17c8b4db5cc41" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "job_status_log" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying(3000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "jobUuid" uuid, CONSTRAINT "PK_a2c5b7267155f9e2aa34e5a9ba5" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "job_status_enum" AS ENUM('waiting', 'success', 'failed', 'canceled')`);
        await queryRunner.query(`CREATE TABLE "job" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" date NOT NULL, "endDate" date NOT NULL, "status" "job_status_enum" NOT NULL, "config" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "fileUuid" uuid, CONSTRAINT "PK_163ccf9a50de87d231e06ec0c7c" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "file" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "size" character varying(256) NOT NULL, "qtyLines" integer NOT NULL DEFAULT '0', "s3path" character varying NOT NULL, "sync" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "version" integer NOT NULL, "folderUuid" uuid, CONSTRAINT "PK_d85c96c207a7395158a68ee1265" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userUuid" uuid NOT NULL, "roleUuid" uuid NOT NULL, CONSTRAINT "PK_0a82b94535d8d854f68e7275086" PRIMARY KEY ("userUuid", "roleUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb4b662488d0ac6eabe79094b2" ON "user_roles_role" ("userUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_75992747142330886c45087fc4" ON "user_roles_role" ("roleUuid") `);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_7c32b6b68c4b56bdb9b3740e68f" FOREIGN KEY ("tenantUuid") REFERENCES "tenant"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folder" ADD CONSTRAINT "FK_c760b996c27347bf8562bd46948" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" ADD CONSTRAINT "FK_522bd38c785138b6d4ae0e940fd" FOREIGN KEY ("jobUuid") REFERENCES "job"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_result" ADD CONSTRAINT "FK_29690d900c4f275e24f333d1ab6" FOREIGN KEY ("jobUuid") REFERENCES "job"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_status_log" ADD CONSTRAINT "FK_7dbee6a094032c34339d10c0b28" FOREIGN KEY ("jobUuid") REFERENCES "job"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_50a60a68af5b1ab1309e43c2420" FOREIGN KEY ("fileUuid") REFERENCES "file"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd" FOREIGN KEY ("folderUuid") REFERENCES "folder"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_cb4b662488d0ac6eabe79094b2e" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_75992747142330886c45087fc42" FOREIGN KEY ("roleUuid") REFERENCES "role"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_75992747142330886c45087fc42"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_cb4b662488d0ac6eabe79094b2e"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_ae9f3931fd1d0b179e80b9835dd"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_50a60a68af5b1ab1309e43c2420"`);
        await queryRunner.query(`ALTER TABLE "job_status_log" DROP CONSTRAINT "FK_7dbee6a094032c34339d10c0b28"`);
        await queryRunner.query(`ALTER TABLE "job_result" DROP CONSTRAINT "FK_29690d900c4f275e24f333d1ab6"`);
        await queryRunner.query(`ALTER TABLE "job_checkpoint" DROP CONSTRAINT "FK_522bd38c785138b6d4ae0e940fd"`);
        await queryRunner.query(`ALTER TABLE "folder" DROP CONSTRAINT "FK_c760b996c27347bf8562bd46948"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_7c32b6b68c4b56bdb9b3740e68f"`);
        await queryRunner.query(`DROP INDEX "IDX_75992747142330886c45087fc4"`);
        await queryRunner.query(`DROP INDEX "IDX_cb4b662488d0ac6eabe79094b2"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TYPE "job_status_enum"`);
        await queryRunner.query(`DROP TABLE "job_status_log"`);
        await queryRunner.query(`DROP TABLE "job_result"`);
        await queryRunner.query(`DROP TABLE "job_checkpoint"`);
        await queryRunner.query(`DROP TYPE "job_checkpoint_status_enum"`);
        await queryRunner.query(`DROP TABLE "folder"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
    }

}
