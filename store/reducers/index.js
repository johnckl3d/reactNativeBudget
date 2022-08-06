import { combineReducers } from 'redux';
import budgetsReducer from "@Reducers/budgets";
import costCategoriesReducer from "@Reducers/costCategories";
import loginReducer from "@Reducers/login";
import FSMReducer from "@Reducers/FSM";

export default combineReducers({
    budgets: budgetsReducer,
    costCategories: costCategoriesReducer,
    login: loginReducer,
    FSM: FSMReducer
})