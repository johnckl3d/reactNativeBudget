/*
 * @Author: Wooden Lim
 * @Date: 2019-12-18 10:02:13
 * @Last Modified by: Wooden Lim
 * @Last Modified time: 2021-02-25 15:42:41
 */

const DEV = "DEV";
const UAT = "UAT";
const PROD = "PROD";

const UAT_API = "https://localhost:5001/api";
const PROD_API = "https://savion-api-app.azurewebsites.net/api";

let getBudgetUrl = "/budget/retrieveList";
let createBudgetUrl = "/budget";
let costCategoryUrl = "/costCategory";
let registerUrl = "/account/register";
let loginUrl = "/account/login";
let logoutUrl = "/account/revokeToken";
let accountDeletionUrl = "/account/delete";

let env = PROD;
if (env == PROD) {
  getBudgetUrl = PROD_API + getBudgetUrl;
  createBudgetUrl = PROD_API + createBudgetUrl;
  costCategoryUrl = PROD_API + costCategoryUrl;
  registerUrl = PROD_API + registerUrl;
  loginUrl = PROD_API + loginUrl;
  logoutUrl = PROD_API + logoutUrl;
  accountDeletionUrl = PROD_API + accountDeletionUrl;
} else {
  getBudgetUrl = UAT_API + getBudgetUrl;
  createBudgetUrl = UAT_API + createBudgetUrl;
  costCategoryUrl = UAT_API + costCategoryUrl;
  registerUrl = UAT_API + registerUrl;
  loginUrl = UAT_API + loginUrl;
  logoutUrl = UAT_API + logoutUrl;
  accountDeletionUrl = UAT_API + accountDeletionUrl;
}

export const API_URL = {
  //AEM URL
  GET_BUDGET_URL: getBudgetUrl,
  CREATE_BUDGET_URL: createBudgetUrl,
  COSTCATEGORY_URL: costCategoryUrl,
  REGISTER_URL: registerUrl,
  LOGIN_URL: loginUrl,
  LOGOUT_URL: logoutUrl,
  ACCOUNT_DELETE_URL: accountDeletionUrl,
};
