import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationPlanningUser1631047075024 implements MigrationInterface {
  name = "RelationPlanningUser1631047075024";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planning" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "planning" ADD CONSTRAINT "FK_08897b166dee565859b7fb2fcc8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planning" DROP CONSTRAINT "FK_08897b166dee565859b7fb2fcc8"`);
    await queryRunner.query(`ALTER TABLE "planning" DROP COLUMN "userId"`);
  }
}
