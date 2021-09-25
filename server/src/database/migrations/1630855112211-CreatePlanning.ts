import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlanning1630855112211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "planning",
        columns: [
          {
            name: "planningGuid",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "value",
            type: "decimal",
          },
          {
            name: "dateFinal",
            type: "timestamp",
          },
          {
            name: "isGrouped",
            type: "bool",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("planning");
  }
}
