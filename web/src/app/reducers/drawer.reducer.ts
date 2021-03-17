import { createReducer, on } from '@ngrx/store';
import { toggleMainDrawerAction } from '../actions';

const INITIAL_STATE = {
  toggle: true,
};

export const DrawerReducer = createReducer(
  INITIAL_STATE,
  on(toggleMainDrawerAction, (state) => ({
    ...state,
    toggle: !state.toggle,
  }))
);
