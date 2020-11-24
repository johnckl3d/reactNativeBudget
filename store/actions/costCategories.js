import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";

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
      console.log(JSON.stringify(resData));
      const loadedCostCategories = [];

      for (const item of resData) {
        const cIs = [];
        for (const cI of item.costItems) {
          cIs.push(new CostItem(cI.name, cI.amount));
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

export const fetchCostItems = (costCategoryId) => {
  return async (dispatch) => {
    // any async code you want!
    try {
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const resData = await response.json();
      console.log("fetchCostItems::" + JSON.stringify(resData));
      const loadedCostItems = [];

      for (const item of resData) {
        loadedCostItems.push(
          new CostItem(item.name, item.amount, item.costItemId)
        );
      }
      dispatch({
        type: SET_COSTITEMS,
        costCategoryId: costCategoryId,
        costItems: loadedCostItems,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch(
        "https://meetup-api-app-john.azurewebsites.net/api/costCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
          }),
        }
      );
      if (response.status != 201) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
};

export const createCostItem = (costCategoryId, name, description, amount) => {

  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            amount: amount,
          }),
        }
      );
      if (response.status != 201) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status != 204) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {
    }
  };
};

export const deleteCostItem = (costCategoryId, costItemId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem/${costItemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status != 204) {
        throw new Error("something went wrong!");
      } else {
      }
    } catch (err) {
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    try {
      // any async code you want!
      const response = await fetch(
        "https://meetup-api-app-john.azurewebsites.net/api/costCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: "Petrol2",
          }),
        }
      );

      const resData = await response.json();
      
      // dispatch({
      //   type: CREATE_PRODUCT,
      //   productData: {
      //     id: resData.name,
      //     title,
      //     description,
      //     imageUrl,
      //     price
      //   }
      // });
    } catch (err) {
      throw err;
    }
  };
};
