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
import moment from "moment";
import uuid from "react-native-uuid";

export const login = (userId, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      console.log("action::login::transactionID::" + transactionID);
      const response = await fetch(API_URL.LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json-patch+json",
          TransactionID: transactionID,
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
          ipAddress: "10.100.100.100",
        }),
      });
      console.log("action::login::resData::1");
      dispatch({ type: SET_LOADING, isLoading: false });
      console.log("action::login::resData::2");
      console.log("action::login::resData::3::" + JSON.stringify(response));
      const resData = await response.json();

      console.log("action::login::resData::" + JSON.stringify(resData));

      if (!response.ok) {
        dispatch({ type: SET_ERROR, hasError: resData.message });
      }
      storeStringData(STORAGE.ACCESS_TOKEN, resData.accessToken);
      storeStringData(STORAGE.REFRESH_TOKEN, resData.refresh_token);

      dispatch({
        type: LOGIN,
        refreshToken: resData.refreshToken,
        accessToken: resData.accessToken,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, hasError: resData.message });
      throw err;
    }
  };
};

export const logout = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_LOADING, isLoading: true });
      const response = await fetch(API_URL.LOGOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json-patch+json",
        },
        body: JSON.stringify({
          accessToken: accessToken,
          ipAddress: "10.100.100.100",
        }),
      });
      dispatch({ type: SET_LOADING, isLoading: false });
      const resData = await response.json();
      if (!response.ok) {
        dispatch({ type: SET_ERROR, hasError: resData.message });
      }
      console.log("action::logout::resData::" + JSON.stringify(resData));
      storeStringData(STORAGE.ACCESS_TOKEN, "");
      storeStringData(STORAGE.REFRESH_TOKEN, "");

      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, hasError: response.message });
      throw err;
    }
  };
};
