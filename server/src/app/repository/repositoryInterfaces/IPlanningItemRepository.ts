import Planning from "../../models/Planning";
import PlanningItem from "../../models/PlanningItem";

export interface IPlanningItemRepository {
  create(planningItemRef: PlanningItem, planningRef: Planning): Promise<boolean>;
  getByPlanning(planning: Planning): Promise<Array<PlanningItem> | null>;
  delete(planningGuid: string): Promise<boolean | null>;
  update(planningItemRef: PlanningItem, planningRef: Planning): Promise<boolean>
}
