import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitTables1700000451291 implements MigrationInterface {
  name = 'InitTables1700000451291'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "manufacturers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "country" character varying(100) NOT NULL, "foundation_date" date NOT NULL, CONSTRAINT "PK_138520de32c379a48e703441975" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE TYPE "public"."products_unit_enum" AS ENUM('kilogram', 'liter')`)
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "price" numeric(10,2) NOT NULL, "unit" "public"."products_unit_enum" NOT NULL DEFAULT 'kilogram', "quantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "manufacturer_id" uuid, "category_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(`CREATE TYPE "public"."users_auth_provider_enum" AS ENUM('local', 'facebook', 'google')`)
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "phone_number" character varying(20), "password" character varying(255) NOT NULL, "auth_provider" "public"."users_auth_provider_enum" NOT NULL DEFAULT 'local', "facebook_id" character varying(255), "google_id" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_5bc36ce05cc397317480efb18f6" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`)
    await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_5bc36ce05cc397317480efb18f6"`)
    await queryRunner.query(`DROP TABLE "users"`)
    await queryRunner.query(`DROP TYPE "public"."users_auth_provider_enum"`)
    await queryRunner.query(`DROP TABLE "products"`)
    await queryRunner.query(`DROP TYPE "public"."products_unit_enum"`)
    await queryRunner.query(`DROP TABLE "manufacturers"`)
    await queryRunner.query(`DROP TABLE "categories"`)
  }
}
