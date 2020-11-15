import CostCategory from "../../models/costCategory";
import CostItem from "../../models/costItem";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
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
      
      loadedCostCategories.push(new CostCategory(item.costCategoryId, item.name, cIs));

    }
    //console.log(resData);
    console.log(loadedCostCategories);
    //dispatch({type: SET_PRODUCT, products: []});
};
};

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    // any async code you want!
    const response = await fetch('https://rn-complete-guide.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    });

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      description,
      imageUrl
    }
  };
};
