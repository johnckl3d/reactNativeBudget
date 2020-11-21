import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";

export const SET_PRODUCTS = "SET_PRODUCTS";

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

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    // any async code you want!
    const response = await fetch(
      "https://meetup-api-app-john.azurewebsites.net/api/costCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'name': 'Petrol2',
        }),
      }
    );

    const resData = await response.json();
    console.log(JSON.stringify(resData));
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
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(
      `https://rn-complete-guide.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
