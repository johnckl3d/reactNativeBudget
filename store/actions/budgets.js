import CostSnapShot from "@Models/costSnapShot";
import CostCategory from "@Models/costCategory";
import CostItem from "@Models/costItem";
import Budget from "@Models/budget";
import { API_URL } from "@Constants/url";
import { SETTINGS } from "@Constants/settings";
import { STORAGE } from "@Constants/storage";
import { getStringData } from "@Utils/storageUtils";
import moment from "moment";
import uuid from "react-native-uuid";
import axios from "axios";
import ACTION_TYPES from "@Actions/actionTypes";
import i18n from "@I18N/i18n";

export const fetchBudgets = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const url = JSON.stringify(API_URL.GET_BUDGET_URL);
      console.log("=======================================================");
      console.log("action::fetchBudgets::transactionID::" + transactionID);
      console.log("action::fetchBudgets::token::" + token);
      console.log("action::fetchBudgets::url::" + url);
      await axios({
        url: API_URL.GET_BUDGET_URL,
        method: "get",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
      })
        .then((response) => {
          console.log(
            "action::fetchBudgets::response::" + JSON.stringify(response.data)
          );
          const loadedBudget = [];
          const resData = response.data;
          for (const b of resData) {
            const css = [];
            for (const cs of b.costSnapShots) {
              css.push(new CostSnapShot(cs.dateTime, cs.amount));
            }
            const ccs = [];
            for (const cc of b.costCategories) {
              const cis = [];
              for (const ci of cc.costItems) {
                cis.push(
                  new CostItem(
                    ci.costItemId,
                    ci.name,
                    ci.description,
                    ci.dateTime,
                    ci.amount
                  )
                );
              }
              ccs.push(
                new CostCategory(
                  cc.budgetId,
                  cc.costCategoryId,
                  cc.name,
                  cc.totalAmount,
                  cis
                )
              );
            }
            loadedBudget.push(
              new Budget(
                b.budgetId,
                b.name,
                b.description,
                b.totalBudgetAmount,
                b.totalCostAmount,
                css,
                ccs
              )
            );
          }
          dispatch({ type: ACTION_TYPES.SET_BUDGETS, budgets: loadedBudget });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: response.data });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      console.log("fetchBudgets::loadedBudget::err" + err);
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
    } finally {
      console.log("fetchBudgets::loadedBudget::finally");
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};

export const createBudget = (token, title, description, amount) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      console.log("=======================================================");
      console.log("createBudget::token::" + token);
      console.log("createBudget::url::" + API_URL.CREATE_BUDGET_URL);
      console.log("createBudget::transactionID::" + transactionID);
      await axios({
        url: API_URL.CREATE_BUDGET_URL,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          name: title,
          description: description,
          totalBudgetAmount: amount,
        }),
      })
        .then((response) => {
          console.log(
            JSON.stringify("createBudget::response::" + response.data)
          );
          // const loadedBudget = [];
          // const resData = response.data;
          dispatch(fetchBudgets(token));
        })
        .catch((error) => {
          console.log("createBudget::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      console.log("createbudget::error::" + err);
      //dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};

export const deleteBudget = (token, budgetId) => {
  console.log("=======================================================");
  console.log("budgets::deleteBudget::budgetId::" + budgetId);
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      const url = API_URL.DELETE_BUDGET_URL + "/" + budgetId;
      console.log("deleteBudget::transactionID::" + transactionID);
      console.log("deleteBudget::url::" + url);
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
          console.log(
            JSON.stringify("deleteBudget::response::" + response.data)
          );
          // const loadedBudget = [];
          // const resData = response.data;
          dispatch(fetchBudgets(token));
        })
        .catch((error) => {
          console.log("deleteBudget::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};
