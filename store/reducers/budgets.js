import { SET_BUDGETS } from "../actions/budgets";
import { getWeekOfDayWithOffset } from "../../helpers/helpers";
import Moment from "moment";

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
