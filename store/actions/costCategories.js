import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";


export const SET_PRODUCT = 'SET_PRODUCTS';


export const fetchCostCategories = () => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch('https://meetup-api-app-john.azurewebsites.net/api/budget', {
      method: 'GET',
    });
    const resData = await response.json();
    const loadedCostCategories = [];
  
    for (const item of resData){
      const cIs = [];
      for (const cI of item.costItems){
        cIs.push(new CostItem(cI.name, cI.amount));
      }
      
      loadedCostCategories.push(new CostCategory(item.costCategoryId, item.name, item.totalAmount, cIs));

    }
    //console.log(resData);
    //console.log(loadedCostCategories);
    dispatch({type: SET_PRODUCT, costCategories: loadedCostCategories});
};
};
