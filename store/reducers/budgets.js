import { SET_BUDGETS, DELETE_BUDGETS } from "../actions/budgets";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUDGETS:
      return action.budgets
  }
  return state;
};
