export interface PlanningRequest {
  planningGuid?: string;
  name: string;
  value: number;
  dateFinal: Date;
  isGrouped: boolean;
  planningItems: Array<PlanningItemRequest>;
}

export interface PlanningItemRequest {
  planningItemGuid?: string;
  name: string;
  totalValue: number;
  entryValue: number;
  category: number;
}
