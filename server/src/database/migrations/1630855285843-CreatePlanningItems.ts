import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlanningItems1630855285843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "planningItem",
        columns: [
          {
            name: "planningItemGuid",
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
            name: "totalValue",
            type: "decimal",
          },
          {
            name: "entryValue",
            type: "decimal",
          },
          {
            name: "category",
            type: "decimal",
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
    await queryRunner.dropTable("planningItem");
  }
}
