import { LOGIN, RETRIEVE_TOKEN, LOGOUT, REGISTER } from "@Actions/login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE} from "@Constants/storage";

const initialState = {
  refreshToken: null,
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("loginreducer::" + action.refreshToken);
      return {
        refreshToken: action.refreshToken,
        accessToken: action.refreshToken,
      };
    case LOGOUT:
      return {
        refreshToken: null,
        accessToken: null,
      };
  }
  return state;
};
