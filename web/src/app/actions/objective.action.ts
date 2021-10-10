import { createAction, props } from '@ngrx/store';
import { ObjectiveResponse } from '../models/response/objectiveResponse.model';

enum ActionTypes {
  GET_OBJECTIVES = '@financialControl/GET_OBJECTIVES',
}

export const getObjectives = createAction(
  ActionTypes.GET_OBJECTIVES,
  props<{ response: Array<ObjectiveResponse> }>()
);
