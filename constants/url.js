/*
 * @Author: Wooden Lim
 * @Date: 2019-12-18 10:02:13
 * @Last Modified by: Wooden Lim
 * @Last Modified time: 2021-02-25 15:42:41
 */

const DEV = 'DEV';
const UAT = 'UAT';
const PROD = 'PROD';

const UAT_API = 'https://localhost:5001/api';
const PROD_API = 'https://savion-api-app.azurewebsites.net/api';

let budgetBaseUrl = '/budget';
let env = PROD;
if (env == PROD) {
    budgetBaseUrl = PROD_API + budgetBaseUrl;
} else {
    budgetBaseUrl = UAT_API + budgetBaseUrl;
} 


export const API_URL = {
   
    //AEM URL
    BUDGET_URL: budgetBaseUrl,
    AEM_VERIFY_CONTACT_URL:
    budgetBaseUrl + '/insurance/verify-contact-details.app.html',
};
