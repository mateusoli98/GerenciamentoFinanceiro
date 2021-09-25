import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationMemberPlanning1631047209668 implements MigrationInterface {
  name = "RelationMemberPlanning1631047209668";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" ADD "planningGuid" uuid`);
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_53241563cd9e8181gfe2fa76077" FOREIGN KEY ("planningGuid") REFERENCES "planning"("planningGuid") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_53241563cd9e8181gfe2fa76077"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "planningGuid"`);
  }
}
