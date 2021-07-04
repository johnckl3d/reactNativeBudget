import { combineReducers } from 'redux';
import budgetsReducer from "@Reducers/budgets";
import cartReducer from "@Reducers/cart";
import costCategoriesReducer from "@Reducers/costCategories";
import ordersReducer from "@Reducers/orders";
import productsReducer from "@Reducers/products";
import loginReducer from "@Reducers/login";

export default combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    budgets: budgetsReducer,
    costCategories: costCategoriesReducer,
    login: loginReducer,
})