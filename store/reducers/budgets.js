import ACTION_TYPES from "@Actions/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_BUDGETS:
      return action.budgets;
  }
  return state;
};
