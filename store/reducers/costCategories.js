
import {
  SET_PRODUCTS
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
  }
  return state;
};
