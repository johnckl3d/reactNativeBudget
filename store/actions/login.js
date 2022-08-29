import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
import { SETTINGS } from "@Constants/settings";
export const LOGIN = "LOGIN";
export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
export const LOGOUT = "LOGOUT";
export const REGISTER = "REGISTER";
import { STORAGE } from "@Constants/storage";
import { storeStringData } from "@Utils/storageUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";
import uuid from "react-native-uuid";
import axios from "axios";
import { NetworkInfo } from "react-native-network-info";
import ACTION_TYPES from "@Actions/actionTypes";

export const login = (userId, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const ip = "";
      // await NetworkInfo.getIPV4Address().then((ipv4Address) => {
      //   ip = ipv4Address;
      // });
      console.log("action::login::transactionID::" + transactionID);
      console.log("action::login::ip::" + ip);

      await axios({
        url: API_URL.LOGIN_URL,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json-patch+json",
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          userId: userId,
          password: password,
          ipAddress: ip,
        }),
      })
        .then((response) => {
          console.log("action::login::response::" + JSON.stringify(response));
          storeStringData(STORAGE.ACCESS_TOKEN, response.data.accessToken);
          storeStringData(STORAGE.REFRESH_TOKEN, response.data.refresh_token);
          dispatch({
            type: LOGIN,
            refreshToken: response.data.refreshToken,
            accessToken: response.data.accessToken,
            userId: response.data.userId,
            emailAdd: response.data.emailAdd,
          });

          dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
        })
        .catch((error) => {
          dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: error });
          dispatch({ type: LOGOUT });
        });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
      throw err;
    }
  };
};

export const logout = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
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
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
      const resData = await response.json();
      if (!response.ok) {
        dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: resData.message });
      }
      console.log("action::logout::resData::" + JSON.stringify(resData));
      storeStringData(STORAGE.ACCESS_TOKEN, "");
      storeStringData(STORAGE.REFRESH_TOKEN, "");

      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: response.message });
      throw err;
    }
  };
};
