import { LOGIN, RETRIEVE_TOKEN, LOGOUT, REGISTER } from "@Actions/login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from "@Constants/storage";

const initialState = {
  refreshToken: null,
  accessToken: null,
};

export default (state = initialState, action) => {
  // console.log("loginreducer::action::" + action.type);
  // console.log("loginreducer::action::" + action.accessToken);
  // console.log("loginreducer::action::" + action.refreshToken);
  switch (action.type) {
    case LOGIN:
      return {
        refreshToken: action.refreshToken,
        accessToken: action.accessToken,
      };
    case LOGOUT:
      return {
        refreshToken: null,
        accessToken: null,
      };
  }
  return state;
};
