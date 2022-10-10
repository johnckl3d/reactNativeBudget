import { combineReducers } from "redux";
import budgetsReducer from "@Reducers/budgets";
import loginReducer from "@Reducers/login";
import FSMReducer from "@Reducers/FSM";

export default combineReducers({
  budgets: budgetsReducer,
  login: loginReducer,
  FSM: FSMReducer,
});
