import { createReducer, on } from '@ngrx/store';
import {
  getChartFinancialControl,
  getGridFinancialControl,
} from '../actions/financialControl.action';
import { FinancialControlResponse } from '../models/response/financialControlResponse.model';
import { LineChartResponse } from '../models/response/lineChartResponse';

interface State {
  gridFinancialControl?: Array<FinancialControlResponse>;
  chartFinancialControl?: LineChartResponse;
}

const INITIAL_STATE: State = {
  gridFinancialControl: undefined,
  chartFinancialControl: undefined,
};

export const FinancialControlReducer = createReducer(
  INITIAL_STATE,
  on(getGridFinancialControl, (state, props) => ({
    ...state,
    gridFinancialControl: props.response,
  })),
  on(getChartFinancialControl, (state, props) => ({
    ...state,
    chartFinancialControl: props.response,
  }))
);
