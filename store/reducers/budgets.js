import {
  SET_BUDGETS
  } from "../actions/budgets";
  import {getWeekOfDay} from "../../helpers/helpers"
  import Moment from "moment";
  
  const initialState = {
    budgets: [],
  };
  
  export default (state = initialState, action) => {

    switch (action.type) {
      case SET_BUDGETS:
        action.budgets.forEach(b => {
          b.costSnapShots.forEach(input => {
            console.log("debug:" + JSON.stringify(getWeekOfDay(Moment(input.dateTime))));
            //console.log("debug:" + JSON.stringify(getWeekOfDay(input.x)));
          }

          )
        });
        return {
          budgets: action.budgets,
        };
    
    }
    return state;
  };
  