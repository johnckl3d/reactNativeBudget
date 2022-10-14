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

export function setBudgetIndex(int) {
  return {
    type: ACTION_TYPES.SET_BUDGETINDEX,
    selectedBudgetIndex: int,
  };
}

export function setBudgetMonthIndex(int) {
  return {
    type: ACTION_TYPES.SET_BUDGETMONTHINDEX,
    selectedBudgetMonthIndex: int,
  };
}

export function setMonthRange(monthRange) {
  return {
    type: ACTION_TYPES.SET_MONTHRANGE,
    monthRange: monthRange,
  };
}
