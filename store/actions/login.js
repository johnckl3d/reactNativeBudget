import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
export const LOGIN = "LOGIN";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
import { STORAGE } from "@Constants/storage";
import { storeStringData } from "@Utils/storageUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SET_ERROR, SET_LOADING } from "@Actions/FSM";

export const login = (userId, password) => {
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
          ipAddress: "10.100.100.100",
        }),
      });
      //dispatch({ type: SET_LOADING, isLoading: false });
      if (!response.ok) {
        dispatch({ type: SET_ERROR, hasError: response.status });
      }
      const resData = await response.json();
      console.log("action::login::resData::" + JSON.stringify(resData));
      storeStringData(STORAGE.ACCESS_TOKEN, resData.accessToken);
      storeStringData(STORAGE.REFRESH_TOKEN, resData.refresh_token);
      //dispatch({ type: SET_ERROR, hasError: response.status });
      dispatch({
        type: LOGIN,
        refreshToken: resData.refreshToken,
        accessToken: resData.accessToken,
      });
    } catch (err) {
      console.log("action::login::err::" + err);
      throw err;
    }
  };
};
