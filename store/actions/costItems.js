import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import { API_URL } from "@Constants/url";
import moment from "moment";
import uuid from "react-native-uuid";
import ACTION_TYPES from "@Actions/actionTypes";
import axios from "axios";
import { SETTINGS } from "@Constants/settings";
import * as budgetsActions from "@Actions/budgets";
import i18n from "@I18N/i18n";

export const createCostItem = (
  token,
  costCategoryId,
  name,
  description,
  amount
) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });

      const transactionID = moment().format() + uuid.v4();
      const url =
        API_URL.CREATE_COSTITEM_URL + "/" + costCategoryId + "/costItem";
      console.log("=======================================================");
      console.log("createCostItem::url::" + url);
      console.log("createCostItem::token::" + token);
      console.log("createCostItem::budgetId::" + costCategoryId);
      console.log("createCostItem::name::" + name);
      console.log("createCostItem::description::" + description);
      console.log("createCostItem::transactionID::" + transactionID);
      console.log("createCostItem::amount::" + amount);
      await axios({
        url: url,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          name: name,
          description: description,
          amount: amount,
        }),
      })
        .then((response) => {
          console.log(
            "createCostItem::response::" + JSON.stringify(response.data)
          );
          // const loadedBudget = [];
          // const resData = response.data;
          dispatch(budgetsActions.fetchBudgets(token));
          //fetchBudgets(token);
        })
        .catch((error) => {
          console.log("createCostItem::error::" + error);
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

export const deleteCostItem = (token, costCategoryId, costItemId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      const url =
        API_URL.DELETE_COSTITEM_URL +
        "/" +
        costCategoryId +
        "/costItem/" +
        costItemId;
      console.log("=======================================================");
      console.log("deleteCostItem::url::" + url);
      console.log("deleteCostItem::token::" + token);
      console.log("deleteCostItem::costCategoryId::" + costCategoryId);
      console.log("deleteCostItem::costItemId::" + costItemId);
      console.log("deleteCostItem::transactionID::" + transactionID);
      await axios({
        url: url,
        method: "delete",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
      })
        .then((response) => {
          console.log("deleteCostItem::response::" + response.status);
          dispatch(budgetsActions.fetchBudgets(token));
        })
        .catch((error) => {
          console.log("deleteCostItem::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {}
  };
};
