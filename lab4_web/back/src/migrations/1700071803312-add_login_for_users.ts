import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddLoginForUsers1700071803312 implements MigrationInterface {
  name = 'AddLoginForUsers1700071803312'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "login" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "login"`)
  }
}
