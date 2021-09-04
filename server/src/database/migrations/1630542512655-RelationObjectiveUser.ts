import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationObjectiveUser1630542512655 implements MigrationInterface {
  name = "RelationObjectiveUser1630542512655";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "objective" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "objective" ADD CONSTRAINT "FK_80c5cb8a5e6cacdafb19fd0b1ca" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "objective" DROP CONSTRAINT "FK_80c5cb8a5e6cacdafb19fd0b1ca"`
    );
    await queryRunner.query(`ALTER TABLE "objective" DROP COLUMN "userId"`);
  }
}
