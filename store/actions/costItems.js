import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";
import { API_URL } from "@Constants/url";
import moment from "moment";
import uuid from "react-native-uuid";
import ACTION_TYPES from "@Actions/actionTypes";
import axios from "axios";
import { SETTINGS } from "@Constants/settings";
import { fetchBudgets } from "@Actions/budgets";
import i18n from "@I18N/i18n";

// export const fetchCostItems = (costCategoryId) => {
//   return async (dispatch) => {
//     // any async code you want!
//     try {
//       const response = await fetch(
//         `https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem`,
//         {
//           method: "GET",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("something went wrong!");
//       }
//       const resData = await response.json();
//       const loadedCostItems = [];

//       for (const item of resData) {
//         loadedCostItems.push(
//           new CostItem(item.name, item.amount, item.costItemId)
//         );
//       }
//       dispatch({
//         type: SET_COSTITEMS,
//         costCategoryId: costCategoryId,
//         costItems: loadedCostItems,
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const createCostItem = (
  token,
  costCategoryId,
  name,
  description,
  amount
) => {
  console.log("costItems::createCostItem");
  return async (dispatch) => {
    try {
      // any async code you want!
      dispatch({ type: ACTION_TYPES.SET_LOADING, isLoading: true });
      dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: null });
      const transactionID = moment().format() + uuid.v4();
      //`https://meetup-api-app-john.azurewebsites.net/api/costCategory/${costCategoryId}/costItem`,
      const url =
        API_URL.CREATE_COSTITEM_URL + "/" + costCategoryId + "/costItem";
      console.log("createCostItem::url::" + url);
      console.log("createCostItem::token::" + token);
      console.log("createCostItem::budgetId::" + costCategoryId);
      console.log("createCostItem::name::" + name);
      console.log("createCostItem::description::" + description);
      console.log("createCostItem::transactionID::" + transactionID);
      console.log("createCostItem::amount::" + amount);
      await axios({
        url: url,
        method: "post",
        timeout: SETTINGS.TIMEOUT,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          Authorization: "Bearer " + token,
          TransactionID: transactionID,
        },
        data: JSON.stringify({
          name: name,
          description: description,
          amount: amount,
        }),
      })
        .then((response) => {
          console.log(
            JSON.stringify("createCostItem::response::" + response.data)
          );
          // const loadedBudget = [];
          // const resData = response.data;
          dispatch(fetchBudgets(token));
        })
        .catch((error) => {
          console.log("createCostItem::error::" + error);
          dispatch({
            type: ACTION_TYPES.SET_ERROR,
            hasError: i18n.t("common.errorMessage"),
          });
          dispatch({ type: ACTION_TYPES.SET_LOGOUT });
        });
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
    } catch (err) {}
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
    } catch (err) {}
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
