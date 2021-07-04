import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
export const LOGIN = "LOGIN";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
import {STORAGE} from "@Constants/storage";
import { getStringData } from "@Utils/storageUtils";

export const login = (userId, password) => {
  return async (dispatch) => {
    try {
     console.log("login request::" + API_URL.LOGIN_URL);
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
      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }
      console.log("login");
      const resData = await response.text();
      console.log(resData);
      //storeStringData(STORAGE.ACCESS_TOKEN, resData);
      //await AsyncStorage.setItem(STORAGE.ACCESS_TOKEN, selectedValue);
      //dispatch({ type: LOGIN, refreshToken: resData,  accessToken: resData});
    } catch (err) {
      throw err;
    }
  };
};
