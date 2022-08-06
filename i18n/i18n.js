/*

 * @Author: Wooden Lim 

 * @Date: 2019-12-18 09:59:53 

 * @Last Modified by: Wooden Lim

 * @Last Modified time: 2019-12-18 10:00:26

 * @Change Log: 

 */

 

import i18n from 'i18n-js';

 

import en from './en.json';

// import ms from '@Locales/ms.json'

 

i18n.defaultLocale = 'en';

i18n.locale = 'en';

i18n.fallbacks = true;

i18n.translations = { en };

// i18n.translations = { en, ms };

 

export default i18n;
