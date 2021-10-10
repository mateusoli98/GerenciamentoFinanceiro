import { createReducer, on } from '@ngrx/store';
import { getObjectives } from '../actions/objective.action';
import { ObjectiveResponse } from '../models/response/objectiveResponse.model';

interface State {
  objectives?: Array<ObjectiveResponse>;
}

const INITIAL_STATE: State = {
  objectives: undefined,
};

export const ObjectiveReducer = createReducer(
  INITIAL_STATE,
  on(getObjectives, (state, props) => ({
    ...state,
    objectives: props.response,
  }))
);
