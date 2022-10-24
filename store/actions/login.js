import CostSnapShot from "../../models/costSnapShot";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import Budget from "../../models/budget";
import { API_URL } from "@Constants/url";
import { SETTINGS } from "@Constants/settings";
import i18n from "@I18N/i18n";

import { KEY } from "@Constants/key";

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
          storeStringData(KEY.ACCESS_TOKEN, response.data.accessToken);
          storeStringData(KEY.REFRESH_TOKEN, response.data.refresh_token);
          dispatch({
            type: ACTION_TYPES.SET_LOGIN,
            refreshToken: response.data.refreshToken,
            accessToken: response.data.accessToken,
            userId: response.data.userId,
            emailAdd: response.data.emailAdd,
          });
        })
        .catch((error) => {
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        hasError: i18n.t("common.errorMessage"),
      });
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
          storeStringData(KEY.ACCESS_TOKEN, "");
          storeStringData(KEY.REFRESH_TOKEN, "");
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

export const deleteAccount = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      const ip = "";
      console.log("action::deleteAccount::accessToken::" + accessToken);
      console.log("action::deleteAccount::transactionID::" + transactionID);
      console.log("action::deleteAccount::ip::" + ip);
      console.log("action::deleteAccount::url::" + API_URL.ACCOUNT_DELETE_URL);
      await axios({
        url: API_URL.ACCOUNT_DELETE_URL,
        method: "delete",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: "Bearer " + accessToken,
          TransactionID: transactionID,
        },
      })
        .then((response) => {
          console.log("action::deleteAccount::response::" + response);
          storeStringData(KEY.ACCESS_TOKEN, "");
          storeStringData(KEY.REFRESH_TOKEN, "");
          dispatch({
            type: ACTION_TYPES.SET_LOGOUT,
          });
        })
        .catch((error) => {
          console.log("action::deleteAccount::error::" + error);
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

export const register = (
  userId,
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  roleId,
  registerCallback
) => {
  console.log(userId);
  return async (dispatch) => {
    try {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      const transactionID = moment().format() + uuid.v4();
      console.log("action::deleteAccount::transactionID::" + transactionID);
      console.log("action::register::userId::" + userId);
      console.log("action::register::email::" + email);
      console.log("action::register::firstname::" + firstName);
      console.log("action::register::lastname::" + lastName);
      console.log("action::register::password::" + password);
      console.log("action::register::confirm_password::" + confirmPassword);
      console.log("action::register::url::" + API_URL.REGISTER_URL);
      await axios({
        url: API_URL.REGISTER_URL,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json-patch+json",
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          userId: userId,
          email: email,
          firstname: firstName,
          lastname: lastName,
          password: password,
          confirmPassword: confirmPassword,
        }),
      })
        .then((response) => {
          console.log("action::register::response::" + response);
          registerCallback();
        })
        .catch((error) => {
          console.log("action::register::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
        });
    } catch (err) {
      console.log("action::register::error::" + error);
      dispatch({
        type: ACTION_TYPES.SET_ERROR,
        hasError: i18n.t("common.errorMessage"),
      });
      throw err;
    } finally {
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: false });
    }
  };
};
