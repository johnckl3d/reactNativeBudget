import {
  SET_PRODUCTS,
  DELETE_PRODUCT,
  SET_COSTITEMS,
} from "../actions/costCategories";
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import { ACTION_TYPES } from "@Actions/actionTypes";

const initialState = {
  costCategories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        costCategories: action.costCategories,
      };
    case SET_COSTITEMS:
      const costCategoryIndex = state.costCategories.findIndex(
        (category) => category.costCategoryId === action.costCategoryId
      );
      const updatedCostCategory = new CostCategory(
        state.costCategories[costCategoryIndex].costCategoryId,
        state.costCategories[costCategoryIndex].name,
        state.costCategories[costCategoryIndex].totalAmount,
        action.costItems
      );

      const updatedCategories = [...state.costCategories];

      updatedCategories[costCategoryIndex] = updatedCostCategory;

      return {
        ...state,
        costCategories: updatedCategories,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        costCategories: state.costCategories.filter(
          (costCategory) =>
            costCategory.costCategoryId !== costCategory.costCategoryId
        ),
      };
  }
  return state;
};
