import { createAction, props } from '@ngrx/store';
import { PlanningResponse } from '../models/response/planningResponse.model';

enum ActionTypes {
  GET_PLANNINGS = '@financialControl/GET_PLANNINGS',
}

export const getPlannings = createAction(
  ActionTypes.GET_PLANNINGS,
  props<{ response: Array<PlanningResponse> }>()
);
