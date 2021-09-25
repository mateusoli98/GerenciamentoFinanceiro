import { getRepository } from "typeorm";
import Planning from "../models/Planning";
import PlanningItem from "../models/PlanningItem";
import { IPlanningItemRepository } from "./repositoryInterfaces/IPlanningItemRepository";

class PlanningItemRepository implements IPlanningItemRepository {
  async create(planningItemRef: PlanningItem, planningRef: Planning): Promise<boolean> {
    const repository = getRepository(PlanningItem);

    const { name, value, category } = planningItemRef;

    await repository
      .query(
        `INSERT INTO 
            public."planningItem"(name, value, category, "planningGuid")
        VALUES 
            ('${name}', ${value}, ${category}, '${planningRef.planningGuid}')`
      )
      .then((res) => {
        return true;
      })
      .catch((ex) => {
        console.log(`ex: ${ex}`);
      });

    return false;
  }

  async getByPlanning(planning: Planning): Promise<Array<PlanningItem> | null> {
    const repository = getRepository(PlanningItem);

    const planningItems: Array<PlanningItem> = await repository.query(`
      SELECT 
        "planningItemGuid", 
        name, 
        value, 
        category, 
        created_at, 
        updated_at
      FROM 
        public."planningItem"
      WHERE
        "planningGuid" = '${planning.planningGuid}'
      ORDER BY
        created_at ASC
    `);

    return planningItems;
  }

  async delete(planningGuid: string): Promise<boolean | null> {
    const repository = getRepository(PlanningItem);

    const result = await repository.query(`
      DELETE FROM public."planningItem"
      WHERE 
        "planningGuid" = '${planningGuid}';
    `);

    if (result) {
      return true;
    }

    return false;
  }
}

export default new PlanningItemRepository();
