
import {
  SET_PRODUCTS, DELETE_PRODUCT
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
        costCategories: action.costCategories,
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
