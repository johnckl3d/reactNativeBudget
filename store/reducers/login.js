import { LOGIN, RETRIEVE_TOKEN, LOGOUT, REGISTER } from "@Actions/login";

const initialState = {
  isLoading: true,
  refreshToken: null,
  accessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        refreshToken: action.refreshToken,
        accessToken: action.refreshToken,
        isLoading: false,
      };
    case LOGOUT:
      return {
        refreshToken: null,
        accessToken: null,
        isLoading: false,
      };
  }
  return state;
};
