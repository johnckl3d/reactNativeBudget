
import {
  SET_PRODUCTS, DELETE_PRODUCT, SET_COSTITEMS
} from '../actions/costCategories';
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";

const initialState = {
  //costCategories: CostCategory
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        costCategories: action.costCategories,
      };
      case SET_COSTITEMS:
        console.log("here");
        const costCategoryIndex = state.costCategories.findIndex(
          category => category.id === action.costCategoryId
        );
        const updatedCostCategory = new CostCategory(
          costCategoryId = state.costCategories[costCategoryIndex].costCategoryId,
          name = state.costCategories[costCategoryIndex].name,
          totalAmount = state.costCategories[costCategoryIndex].totalAmount,
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
          costCategory => costCategory.costCategoryId !== costCategory.costCategoryId
        ),
      };
  }
  return state;
};
