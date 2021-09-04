import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateObjectivesTable1630541894907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "objective",
        columns: [
          {
            name: "objectiveGuid",
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
            name: "description",
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
            name: "dateFinal",
            type: "timestamp",
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
    await queryRunner.dropTable("objective");
  }
}
