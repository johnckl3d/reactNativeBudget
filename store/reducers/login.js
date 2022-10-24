import AsyncStorage from "@react-native-async-storage/async-storage";
import ACTION_TYPES from "@Actions/actionTypes";

const initialState = {
  refreshToken: null,
  accessToken: null,
  userId: null,
  emailAdd: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN:
      return {
        refreshToken: action.refreshToken,
        accessToken: action.accessToken,
        userId: action.userId,
        emailAdd: action.emailAdd,
      };
    case ACTION_TYPES.SET_LOGOUT:
      return {
        refreshToken: null,
        accessToken: null,
      };
  }
  return state;
};
