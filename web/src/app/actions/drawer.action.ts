import { createAction } from '@ngrx/store';

enum ActionTypes {
  TOGGLE_MAIN_DRAWER = '@drawer/TOGGLE_MAIN_DRAWER',
}

export const toggleMainDrawerAction = createAction(ActionTypes.TOGGLE_MAIN_DRAWER);