import {
  SET_BUDGETS
  } from "../actions/budgets";

  const initialState = {
    budgets: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_BUDGETS:
        return {
          budgets: action.budgets,
        };
    
    }
    return state;
  };
  