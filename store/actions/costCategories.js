import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import { API_URL } from "@Constants/url";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_COSTITEMS = "SET_COSTITEMS";
import ACTION_TYPES from "@Actions/actionTypes";
import moment from "moment";
import uuid from "react-native-uuid";
import axios from "axios";
import { SETTINGS } from "@Constants/settings";
import i18n from "@I18N/i18n";
import { fetchBudgets } from "@Actions/budgets";

export const createCostCategory = (token, budgetId, name, description) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      console.log("createCostCategory::token::" + token);
      console.log("createCostCategory::budgetId::" + budgetId);
      console.log("createCostCategory::name::" + name);
      console.log("createCostCategory::description::" + description);
      console.log("createCostCategory::transactionID::" + transactionID);
      await axios({
        url: API_URL.COSTCATEGORY_URL,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          budgetId: budgetId,
          name: name,
          description: description,
        }),
      })
        .then((response) => {
          console.log(
            JSON.stringify("createCostCategory::response::" + response.data)
          );
          // const loadedBudget = [];
          // const resData = response.data;
          dispatch(fetchBudgets(token));
        })
        .catch((error) => {
          console.log("createCostCategory::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteCostCategory = (token, costCategoryId) => {
  console.log("deleteCostCategory::");
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      const url = API_URL.DELETE_COSTCATEGORY_URL + "/" + costCategoryId;
      console.log("deleteCostCategory::url::" + url);
      console.log("deleteCostCategory::token::" + token);
      console.log("deleteCostCategory::costCategoryId::" + costCategoryId);
      console.log("deleteCostCategory::transactionID::" + transactionID);
      await axios({
        url: url,
        method: "DELETE",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
      })
        .then((response) => {
          console.log(
            JSON.stringify("deleteCostCategory::response::" + response.data)
          );
          dispatch(fetchBudgets(token));
        })
        .catch((error) => {
          console.log("deleteCostCategory::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {}
  };
};
