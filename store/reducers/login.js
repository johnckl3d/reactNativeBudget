import { LOGIN, RETRIEVE_TOKEN, LOGOUT, REGISTER } from "@Actions/login";

const initialState = {
  refreshToken: null,
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
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
