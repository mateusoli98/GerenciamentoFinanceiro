import { createReducer, on } from '@ngrx/store';
import { getPlannings } from '../actions/planning.action';
import { PlanningResponse } from '../models/response/planningResponse.model';

interface State {
  plannings?: Array<PlanningResponse>;
}

const INITIAL_STATE: State = {
  plannings: undefined,
};

export const PlanningReducer = createReducer(
  INITIAL_STATE,
  on(getPlannings, (state, props) => ({
    ...state,
    plannings: props.response,
  }))
);
