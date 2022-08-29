import ACTION_TYPES from "@Actions/actionTypes";

export function hasError(bool) {
  return {
    type: ACTION_TYPES.SET_ERROR,
    hasErrored: bool,
  };
}
export function isLoading(bool) {
  return {
    type: ACTION_TYPES.SET_LOADING,
    isLoading: bool,
  };
}
