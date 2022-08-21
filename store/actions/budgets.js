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
export const SET_BUDGETS = "SET_BUDGETS";
export const DELETE_BUDGETS = "DELETE_BUDGETS";
import axios from "axios";

export const fetchBudgets = (token) => {
  return async (dispatch) => {
    //dispatch({ type: SET_LOADING, isLoading: true });
    const transactionID = moment().format() + uuid.v4();
    // console.log("action::fetchBudgets::transactionID::" + transactionID);
    console.log("action::fetchBudgets::token::" + token);
    console.log("action::fetchBudgets::url::" + API_URL.BUDGET_URL);
    const requestOptions = {
      url: API_URL.BUDGET_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        TransactionID: transactionID,
      },
    };
    axios(requestOptions)
      .then((res) => {
        console.log("here1");
        dispatch({ type: SET_ERROR, hasError: res.data });
      })
      .catch((err) => {
        console.log("here2");
        dispatch({ type: SET_ERROR, hasError: err });
      });
  };
};

// try {
//   dispatch({ type: SET_LOADING, isLoading: true });
//   const transactionID = moment().format() + uuid.v4();
//   console.log("action::fetchBudgets::transactionID::" + transactionID);
//   console.log("action::fetchBudgets::token::" + token);
//   console.log("action::fetchBudgets::url::" + API_URL.BUDGET_URL);
//   return(fetch(API_URL.BUDGET_URL, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json-patch+json',
//         Authorization: 'Bearer ' + token,
//         TransactionID: transactionID,
//       },
//     }))
//   .then(res => res.json())
//   .then(json => {
//     console.log("fetchBudgets::1::");
//       return(dispatch({ type: SET_ERROR, hasError: json }));
//   })
//   .catch(err => dispatch({ type: SET_ERROR, hasError: err }))
// const response = await fetch(API_URL.LOGIN_URL, {
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json-patch+json',
//     Authorization: 'Bearer ' + token,
//     TransactionID: transactionID,
//   },
// })
// console.log("fetchBudgets::1::");
// const resData = await response.json();
// console.log("fetchBudgets::resData::" + JSON.stringify(resData));
// if (!response.ok) {
//   dispatch({ type: SET_ERROR, hasError: resData.message });
//   dispatch({ type: LOGOUT });
// }

// const loadedBudget = [];

// for (const b of resData) {
//   const css = [];
//   for (const cs of b.costSnapShots) {
//     css.push(new CostSnapShot(cs.dateTime, cs.amount));
//   }
//   const ccs = [];
//   for (const cc of b.costCategories) {
//     const cis = [];
//     for (const ci of cc.costItems) {
//       cis.push(new CostItem(ci.name, ci.amount, ci.costItemId));
//     }
//     ccs.push(
//       new CostCategory(
//         cc.budgetId,
//         cc.costCategoryId,
//         cc.name,
//         cc.totalAmount,
//         cis
//       )
//     );
//   }
//   //console.log("budgets::action::" + JSON.stringify(ccs));
//   loadedBudget.push(
//     new Budget(
//       b.budgetId,
//       b.name,
//       b.description,
//       b.totalBudgetAmount,
//       b.totalCostAmount,
//       css,
//       ccs
//     )
//   );
// }
// console.log(
//   "fetchBudgets::loadedBudget::" + JSON.stringify(loadedBudget)
// );
// dispatch({ type: SET_BUDGETS, budgets: loadedBudget });
// } catch (err) {
//   console.log("fetchBudgets::err::" + err);
//   dispatch({ type: SET_ERROR, hasError: err });
// } finally {
//   dispatch({ type: SET_LOADING, isLoading: false });
// }
//   };
// };

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
