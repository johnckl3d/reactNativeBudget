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

export function setBudgetId(string) {
  return {
    type: ACTION_TYPES.SET_BUDGETID,
    selectedBudgetId: string,
  };
}

export function setBudgetMonthIndex(string) {
  return {
    type: ACTION_TYPES.SET_BUDGETMONTH,
    selectedBudgetMonthIndex: string,
  };
}

export function setGraphDataAmount(graphDataAmount) {
  return {
    type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
    graphDataAmount: graphDataAmount,
  };
}

export function setGraphDataWeek(graphDataWeek) {
  return {
    type: ACTION_TYPES.SET_GRAPHDATAWEEK,
    graphDataWeek: graphDataWeek,
  };
}
