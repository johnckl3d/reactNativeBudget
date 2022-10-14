import ACTION_TYPES from "@Actions/actionTypes";

const initialState = {
  hasError: null,
  isLoading: false,
  selectedBudgetIndex: 0,
  selectedBudgetMonthIndex: 0,
  monthRange: null,
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
    case ACTION_TYPES.SET_BUDGETINDEX:
      return {
        ...state,
        selectedBudgetIndex: action.selectedBudgetIndex,
      };
    case ACTION_TYPES.SET_BUDGETMONTHINDEX:
      return {
        ...state,
        selectedBudgetMonthIndex: action.selectedBudgetMonthIndex,
      };
    case ACTION_TYPES.SET_MONTHRANGE:
      return {
        ...state,
        monthRange: action.monthRange,
      };
  }
  return state;
};
