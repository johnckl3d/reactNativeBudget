import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
import { SETTINGS } from "@Constants/settings";

//export const RETRIEVE_TOKEN = "RETRIEVE_TOKEN";
//export const REGISTER = "REGISTER";
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
            type: ACTION_TYPES.SET_LOGIN,
            refreshToken: response.data.refreshToken,
            accessToken: response.data.accessToken,
            userId: response.data.userId,
            emailAdd: response.data.emailAdd,
          });
        })
        .catch((error) => {
          dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: error });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: err });
      throw err;
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};

export const logout = (refreshToken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const ip = "";
      console.log("action::login::refreshToken::" + refreshToken);
      console.log("action::login::transactionID::" + transactionID);
      console.log("action::login::ip::" + ip);
      console.log("action::login::url::" + API_URL.LOGOUT_URL);
      await axios({
        url: API_URL.LOGOUT_URL,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json-patch+json",
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          refreshToken: refreshToken,
          ipAddress: ip,
        }),
      })
        .then((response) => {
          console.log("login::logout::" + response);
          storeStringData(STORAGE.ACCESS_TOKEN, "");
          storeStringData(STORAGE.REFRESH_TOKEN, "");
          dispatch({
            type: ACTION_TYPES.SET_LOGOUT,
          });
        })
        .catch((error) => {
          console.log("login::logout::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: "there is something wrong!",
          });
        });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        hasError: "there is something wrong!",
      });
      throw err;
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};
