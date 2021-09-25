import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationPlanningItemsPlanning1631046804296 implements MigrationInterface {
  name = "RelationPlanningItemsPlanning1631046804296";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planningItem" ADD "planningGuid" uuid`);
    await queryRunner.query(
      `ALTER TABLE "planningItem" ADD CONSTRAINT "FK_53241563cd9e81816fe2fa76077" FOREIGN KEY ("planningGuid") REFERENCES "planning"("planningGuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planningItem" DROP CONSTRAINT "FK_53241563cd9e81816fe2fa76077"`);
    await queryRunner.query(`ALTER TABLE "planningItem" DROP COLUMN "planningGuid"`);
  }
}
