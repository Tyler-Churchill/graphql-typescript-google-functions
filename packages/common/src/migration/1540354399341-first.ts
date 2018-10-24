import {MigrationInterface, QueryRunner} from "typeorm";

export class first1540354399341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "users_permissions_enum" AS ENUM('PERM_PUBLIC', 'PERM_ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'USER_ACTIVE', "permissions" "users_permissions_enum" array NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_permissions_enum"`);
    }

}
