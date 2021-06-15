import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
export const LOGIN = "LOGIN";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";

export const login = (userId, password) => {
  return async (dispatch) => {
    try {
     
      const response = await fetch(API_URL.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response;
      console.log(JSON.stringify(resData));
      dispatch({ type: LOGIN, refreshToken: resData,  accessToken: resData});
    } catch (err) {
      throw err;
    }
  };
};
