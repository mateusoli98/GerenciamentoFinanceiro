import { createAction, props } from '@ngrx/store';
import { FinancialControlResponse } from '../models/response/financialControlResponse.model';
import { LineChartResponse } from '../models/response/lineChartResponse';

enum ActionTypes {
  GET_GRID_FINANCIAL_CONTROL = '@financialControl/GET_GRID_FINANCIAL_CONTROL',
  GET_CHART_FINANCIAL_CONTROL = '@financialControl/GET_CHART_FINANCIAL_CONTROL',
}

export const getGridFinancialControl = createAction(
  ActionTypes.GET_GRID_FINANCIAL_CONTROL,
  props<{ response: Array<FinancialControlResponse> }>()
);

export const getChartFinancialControl = createAction(
  ActionTypes.GET_CHART_FINANCIAL_CONTROL,
  props<{ response: LineChartResponse }>()
);
