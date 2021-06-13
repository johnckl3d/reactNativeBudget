import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
export const LOGIN = "LOGIN";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

export const login = () => {
  console.log("login::" + API_URL.LOGIN_URL);
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL.LOGIN_URL, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      dispatch({ type: LOGIN, budgets: loadedBudget });
    } catch (err) {
      throw err;
    }
  };
};
