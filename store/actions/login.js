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
import { storeStringData } from "@Utils/storageUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (userId, password) => {
  console.log("login::resData::1::" + userId);
  console.log("login::resData::1::" + password);
  console.log("login::resData::2::" + API_URL.LOGIN_URL);
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
          ipAddress: "10.100.100.100"
        }),
      });
      // if (!response.ok) {
      //   console.log("login::resData::3" + JSON.stringify(response.json()));
      //   throw new Error("something went wrong!");
      // }
      const resData = await response.json();
      console.log("login::resData::" + JSON.stringify(resData));
      storeStringData(STORAGE.ACCESS_TOKEN, resData.accessToken);
      storeStringData(STORAGE.REFRESH_TOKEN, resData.refresh_token);
      dispatch({ type: LOGIN, refreshToken: resData.refreshToken,  accessToken: resData.accessToken});
    } catch (err) {
      throw err;
    }
  };
};
