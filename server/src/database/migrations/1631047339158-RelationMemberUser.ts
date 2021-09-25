import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationMemberUser1631047339158 implements MigrationInterface {
  name = "RelationMemberUser1631047339158";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_53241563cv9e8181gfe2fa76077" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "member" DROP CONSTRAINT "FK_53241563cv9e8181gfe2fa76077"`);
    await queryRunner.query(`ALTER TABLE "member" DROP COLUMN "userId"`);
  }
}
