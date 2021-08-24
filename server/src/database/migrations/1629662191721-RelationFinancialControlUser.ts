import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationFinancialControlUser1629662191721 implements MigrationInterface {
    name = 'RelationFinancialControlUser1629662191721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financialControl" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD "income" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "financialControl" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD CONSTRAINT "FK_49a1d5ff98949c633b9d267f24e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "financialControl" DROP CONSTRAINT "FK_49a1d5ff98949c633b9d267f24e"`);
        await queryRunner.query(`ALTER TABLE "financialControl" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD "value" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "financialControl" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "financialControl" DROP COLUMN "income"`);
        await queryRunner.query(`ALTER TABLE "financialControl" ADD "password" boolean NOT NULL`);
    }

}
