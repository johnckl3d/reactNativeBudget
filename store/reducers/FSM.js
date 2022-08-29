import ACTION_TYPES from "@Actions/actionTypes";

const initialState = {
  hasError: null,
  isLoading: false,
};

export default (state = initialState, action) => {
  console.log("loginreducer::action.type::" + JSON.stringify(action));
  switch (action.type) {
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        hasError: action.hasError,
      };
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
  }
  return state;
};
