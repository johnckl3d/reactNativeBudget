import { SET_BUDGETS } from "../actions/budgets";
import { getWeekOfDay } from "../../helpers/helpers";
import Moment from "moment";

const initialState = {
  budgets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUDGETS:
      var arr = [0, 0, 0, 0, 0];
      action.budgets.forEach((b) => {
        b.costSnapShots.forEach((input) => {
          arr[getWeekOfDay(Moment(input.dateTime)) - 1] += Number(input.amount).toFixed(2);
          console.log("debug:" + input.amount);
        });
      });
      console.log("debug:" + JSON.stringify(arr));
      return {
        budgets: action.budgets,
      };
  }
  return state;
};
