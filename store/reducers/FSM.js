import ACTION_TYPES from "@Actions/actionTypes";

const initialState = {
  hasError: null,
  isLoading: false,
  selectedBudgetId: null,
  selectedBudgetMonthIndex: 0,
  graphDataAmount: 0,
  graphDataWeek: null,
};

export default (state = initialState, action) => {
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
    case ACTION_TYPES.SET_BUDGETID:
      return {
        ...state,
        selectedBudgetId: action.selectedBudgetId,
      };
    case ACTION_TYPES.SET_BUDGETMONTHINDEX:
      return {
        ...state,
        selectedBudgetMonthIndex: action.selectedBudgetMonthIndex,
      };
    case ACTION_TYPES.SET_GRAPHDATAAMOUNT:
      return {
        ...state,
        graphDataAmount: action.graphDataAmount,
      };
    case ACTION_TYPES.SET_GRAPHDATAAMOUNT:
      return {
        ...state,
        graphDataWeek: action.graphDataWeek,
      };
  }
  return state;
};
