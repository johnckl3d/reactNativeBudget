import { SET_ERROR, SET_LOADING } from "@Actions/FSM";

const initialState = {
  hasError: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        hasError: state.hasError,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: state.isLoading,
      };
  }
  return state;
};
