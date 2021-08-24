import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFinancialControl1629659620558 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "financialControl",
              columns: [
                {
                  name: "id",
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
                  name: "value",
                  type: "decimal",
                },
                {
                  name: "password",
                  type: "bool",
                }
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
