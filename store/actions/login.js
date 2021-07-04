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
      const resData = await response.json();
      storeStringData(STORAGE.ACCESS_TOKEN, resData.accessToken);
      dispatch({ type: LOGIN, refreshToken: resData.refreshToken,  accessToken: resData.accessToken});
    } catch (err) {
      throw err;
    }
  };
};
