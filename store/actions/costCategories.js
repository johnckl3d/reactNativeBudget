import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import { API_URL } from "@Constants/url";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_COSTITEMS = "SET_COSTITEMS";

export const fetchCostCategories = () => {
  return async (dispatch) => {
    // any async code you want!
    try {
      const response = await fetch(
        "https://meetup-api-app-john.azurewebsites.net/api/costCategory",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      const loadedCostCategories = [];

      for (const item of resData) {
        const cIs = [];
        for (const cI of item.costItems) {
          cIs.push(new CostItem(cI.name, cI.amount, cI.costItemId));
        }

        loadedCostCategories.push(
          new CostCategory(
            item.costCategoryId,
            item.name,
            item.totalAmount,
            cIs
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, costCategories: loadedCostCategories });
    } catch (err) {
      throw err;
    }
  };
};

export const createCostCategories = (name, budgetId) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch(API_URL.COSTCATEGORY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          budgetId: budgetId,
        }),
      });
      if (response.status != 201) {
        throw new Error("something went wrong!");
      } else {
        console.log("costCategories::createCostCategory::" + JSON.stringify(response));
      }
    } catch (err) {
      throw err;
    }
  };
};

export const deleteCostCategory = (costCategoryId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL.COSTCATEGORY_URL}/${costCategoryId}`, {
        method: "DELETE",
      });
      console.log("costCategories::deleteCostCategory::" + JSON.stringify(response));
      if (response.status != 204) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {}
  };
};
