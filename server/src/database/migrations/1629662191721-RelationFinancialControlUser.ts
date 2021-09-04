import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationFinancialControlUser1629662191721
  implements MigrationInterface
{
  name = "RelationFinancialControlUser1629662191721";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "financialControl" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "financialControl" ADD CONSTRAINT "FK_49a1d5ff98949c633b9d267f24e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "financialControl" DROP CONSTRAINT "FK_49a1d5ff98949c633b9d267f24e"`
    );
    await queryRunner.query(
      `ALTER TABLE "financialControl" DROP COLUMN "userId"`
    );
  }
}
