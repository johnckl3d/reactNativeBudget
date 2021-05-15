import CostSnapShot from "../../models/costSnapShot";
import Budget from "../../models/budget";

export const SET_BUDGETS = "SET_BUDGETS";

export const fetchBudgets = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://meetup-api-app-john.azurewebsites.net/api/budget",
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

      for (const b of resData) {
        const css = [];
        for (const cs of b.costSnapShots) {
          css.push(new CostSnapShot(cs.dateTime, cs.amount));
        }

        loadedBudget.push(
          new Budget(
            b.budgetId,
            b.name,
            b.totalBudgetAmount,
            b.totalCostAmount,
            css
          )
        );
      }
      //console.log("loadedBudget::" + JSON.stringify(loadedBudget));
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
        "https://meetup-api-app-john.azurewebsites.net/api/budget/b4f10e4c-70cb-44ae-985b-32f13cf9429f",
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
