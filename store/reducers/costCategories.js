
import {
  SET_PRODUCT
} from '../actions/products';
import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";

const initialState = {
    costCategory: CostCategory
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        costCategories: action.costCategories,
      };
  }
  return state;
};
