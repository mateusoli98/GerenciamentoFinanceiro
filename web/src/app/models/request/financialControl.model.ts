export interface FinancialControlRequest {
  financialControlGuid?: string;
  name: string;
  description: string;
  income: boolean;
  value: number;
}
