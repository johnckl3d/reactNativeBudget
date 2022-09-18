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
//import { fetchBudgets } from "@Actions/budgets";

export const fetchBudgets = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const url = JSON.stringify(API_URL.GET_BUDGET_URL);
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
                cis.push(new CostItem(ci.name, ci.amount, ci.costItemId));
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

export const fetchBudgetById = () => {
  return async (dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
    dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
    var token = await getStringData(STORAGE.ACCESS_TOKEN);
    try {
      const response = await fetch(API_URL.GET_BUDGET_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: response.status });
      }
      const resData = await response.json();
      //console.log("fetchBudgets::" + JSON.stringify(resData));
      const loadedBudget = [];
      const css = [];

      for (const cs of resData.costSnapShots) {
        css.push(new CostSnapShot(cs.dateTime, cs.amount));
      }
      loadedBudget.push(
        new Budget(
          resData.budgetId,
          resData.name,
          resData.description,
          resData.totalBudgetAmount,
          resData.totalCostAmount,
          css
        )
      );
      dispatch({ type: ACTION_TYPES.SET_BUDGETS, budgets: loadedBudget });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: response.status });
    }
  };
};

export const createBudget = (token, title, description, amount) => {
  console.log("createBudget::token::" + token);
  console.log("createBudget::url::" + API_URL.CREATE_BUDGET_URL);
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
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

export const deleteBudget = (budgetId) => {
  console.log("budgets::deleteBudget::budgetId::" + budgetId);
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      var token = await getStringData(STORAGE.ACCESS_TOKEN);
      const response = await fetch(`${API_URL.BUDGET_URL}/${budgetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log("budgets::deleteBudget::" + JSON.stringify(response));
      if (response.status != 200) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: response.status });
      } else {
        const resData = await response.json();
        //console.log("fetchBudgets::resData::" + JSON.stringify(resData));
        const loadedBudget = [];

        for (const b of resData) {
          const css = [];
          for (const cs of b.costSnapShots) {
            css.push(new CostSnapShot(cs.dateTime, cs.amount));
          }
          const ccs = [];
          for (const cc of b.costCategories) {
            const cis = [];
            for (const ci of cc.costItems) {
              cis.push(new CostItem(ci.name, ci.amount, ci.costItemId));
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
          //console.log("budgets::action::" + JSON.stringify(ccs));
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
        console.log(
          "fetchBudgets::deleteBudget::" + JSON.stringify(loadedBudget)
        );
        dispatch({ type: ACTION_TYPES.SET_BUDGETS, budgets: loadedBudget });
      }
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};
