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

let budgetBaseUrl = "/budget";
let costCategoryBaseUrl = "/costCategory";
let registerBaseUrl = "/account/register";
let loginBaseUrl = "/account/login";
let logoutBaseUrl = "/account/revokeToken";

let env = PROD;
if (env == PROD) {
  budgetBaseUrl = PROD_API + budgetBaseUrl;
  costCategoryBaseUrl = PROD_API + costCategoryBaseUrl;
  registerBaseUrl = PROD_API + registerBaseUrl;
  loginBaseUrl = PROD_API + loginBaseUrl;
  logoutBaseUrl = PROD_API + logoutBaseUrl;
} else {
  budgetBaseUrl = UAT_API + budgetBaseUrl;
  costCategoryBaseUrl = UAT_API + costCategoryBaseUrl;
  registerBaseUrl = UAT_API + registerBaseUrl;
  loginBaseUrl = UAT_API + loginBaseUrl;
  logoutBaseUrl = UAT_API + logoutBaseUrl;
}

export const API_URL = {
  //AEM URL
  BUDGET_URL: budgetBaseUrl,
  COSTCATEGORY_URL: costCategoryBaseUrl,
  REGISTER_URL: registerBaseUrl,
  LOGIN_URL: loginBaseUrl,
  LOGOUT_URL: logoutBaseUrl,
};
