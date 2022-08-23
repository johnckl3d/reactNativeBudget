import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
import { STORAGE } from "@Constants/storage";
import { getStringData } from "@Utils/storageUtils";
import { SET_ERROR, SET_LOADING } from "@Actions/FSM";
import moment from "moment";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import axios from "axios";

export const SET_BUDGETS = "SET_BUDGETS";
export const DELETE_BUDGETS = "DELETE_BUDGETS";

export const fetchBudgets = (token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const url = JSON.stringify(API_URL.BUDGET_URL);
      console.log("action::fetchBudgets::transactionID::" + transactionID);
      console.log("action::fetchBudgets::token::" + token);
      console.log("action::fetchBudgets::url::" + url);
      await axios({
        url: API_URL.BUDGET_URL,
        method: "get",
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
          console.log(
            "fetchBudgets::loadedBudget::" + JSON.stringify(loadedBudget)
          );
          dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: SET_ERROR, hasError: response.data });
          dispatch({ type: LOGOUT });
        });
    } catch (err) {
      console.log("fetchBudgets::loadedBudget::err");
      dispatch({ type: SET_ERROR, hasError: err });
    } finally {
      console.log("fetchBudgets::loadedBudget::finally");
      dispatch({ type: SET_LOADING, isLoading: false });
    }
  };
};

export const fetchBudgetById = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADING, isLoading: true });
    dispatch({ type: SET_ERROR, hasError: null });
    var token = await getStringData(STORAGE.ACCESS_TOKEN);
    try {
      const response = await fetch(API_URL.BUDGET_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        dispatch({ type: SET_ERROR, hasError: response.status });
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
      dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
    } catch (err) {
      dispatch({ type: SET_ERROR, hasError: response.status });
    }
  };
};

export const createBudget = (title, description, amount) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      dispatch({ type: SET_ERROR, hasError: null });
      var token = await getStringData(STORAGE.ACCESS_TOKEN);
      const response = await fetch(API_URL.BUDGET_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: title,
          description: description,
          totalBudgetAmount: amount,
          totalCostAmount: 0,
        }),
      });
      if (response.status != 200) {
        dispatch({ type: SET_ERROR, hasError: response.status });
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
          "fetchBudgets::createBudget::" + JSON.stringify(loadedBudget)
        );
        dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, hasError: err });
    } finally {
      dispatch({ type: SET_LOADING, isLoading: false });
    }
  };
};

export const deleteBudget = (budgetId) => {
  console.log("budgets::deleteBudget::budgetId::" + budgetId);
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      dispatch({ type: SET_ERROR, hasError: null });
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
        dispatch({ type: SET_ERROR, hasError: response.status });
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
        dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
      }
    } catch (err) {
      dispatch({ type: SET_ERROR, hasError: err });
    } finally {
      dispatch({ type: SET_LOADING, isLoading: false });
    }
  };
};
