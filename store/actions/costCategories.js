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
      //console.log(resData);
      //console.log(loadedCostCategories);
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
      console.log("fetchCostItems::" + resData);
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
      console.log(response.status);
      if (response.status != 201) {
        console.log("Error");
        throw new Error("something went wrong!");
      } else {
        console.log("Success");
      }
      //const resData = await response.json();
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
      console.log(response.status);
      if (response.status != 201) {
        console.log("Error");
        throw new Error("something went wrong!");
      } else {
        console.log("Success");
      }
      
      const resData = await response.json();
      console.log("fetchCostItems::" + resData);
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

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    try {
      console.log("productId:" + productId);
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${productId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response.status);
      if (response.status != 204) {
        console.log("Error");
        throw new Error("something went wrong!");
      } else {
        console.log("Success");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteCostItem = (costCategoryId, costItemId) => {
  return async (dispatch) => {
    try {
      console.log("costItemId:" + costItemId);
      const response = await fetch(
        `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem/${costItemId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response.status);
      if (response.status != 204) {
        console.log("Error");
        throw new Error("something went wrong!");
      } else {
        console.log("Success");
      }
    } catch (err) {
      console.log(err);
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
      console.log("response:");
      console.log(resData);
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
