export interface FinancialControlResponse {
  financialControlGuid: string;
  name: string;
  description: string;
  value: number;
  income: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FinancialControlBalance {
  total: number;
  totalRevenue: number;
  totalOutgoing: number;
}