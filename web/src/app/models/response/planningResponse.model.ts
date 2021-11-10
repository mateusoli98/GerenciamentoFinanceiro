export interface PlanningResponse {
  planningGuid: string;
  name: string;
  value: number;
  dateFinal: Date;
  isGrouped: false;
  created_at: Date;
  updated_at: Date;
  planningItems: Array<PlanningItemsResponse>;
}

export interface PlanningItemsResponse {
  planningItemGuid: string;
  name: string;
  totalValue: number;
  entryValue: number;
  category: number;
  created_at: Date;
  updated_at: Date;
}
