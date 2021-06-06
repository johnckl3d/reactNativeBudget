import CostSnapShot from "../../models/costSnapShot";
import Budget from "../../models/budget";
import { API_URL } from '@Constants/url';
export const SET_BUDGETS = "SET_BUDGETS";

export const fetchBudgets = () => {
  console.log("fetchBudgets::" + API_URL.BUDGET_URL);
  return async (dispatch) => {
    try {
      const response = await fetch(
        API_URL.BUDGET_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      console.log("fetchBudgets::resData::" + JSON.stringify(resData));
      const loadedBudget = [];

      for (const b of resData) {
        const css = [];
        for (const cs of b.costSnapShots) {
          css.push(new CostSnapShot(cs.dateTime, cs.amount));
        }

        loadedBudget.push(
          new Budget(
            b.budgetId,
            b.name,
            b.description,
            b.totalBudgetAmount,
            b.totalCostAmount,
            css
          )
        );
      }
      console.log("fetchBudgets::loadedBudget::" + JSON.stringify(loadedBudget));
      dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchBudgetById = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        API_URL.BUDGET_URL,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
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
      throw err;
    }
  };
};

export const createBudget = (title, description, amount) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch(
        API_URL.BUDGET_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            description: description,
            totalBudgetAmount: amount,
            totalCostAmount: 0
          }),
        }
      );
      if (response.status != 201) {
        throw new Error("something went wrong!");
      } else {
         console.log("budgets::createBudget::" + JSON.stringify(resData));
         
      }
    } catch (err) {
      throw err;
    }
  };
};


export const deleteBudget = (budgetId) => {
  console.log("budgets::deleteBudget::budgetId::" + budgetId);
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL.BUDGET_URL}/${budgetId}`,
        {
          method: "DELETE",
        }
      );
      console.log("budgets::deleteBudget::" + JSON.stringify(response));
      if (response.status != 204) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {
    }
  };
};
