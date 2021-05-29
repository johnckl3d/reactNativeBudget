import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import budgetsReducer from "./store/reducers/budgets";
import costCategoriesReducer from "./store/reducers/costCategories";
import ShopNavigator from "./navigation/ShopNavigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  budgets: budgetsReducer,
  costCategories: costCategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-boldItalic": require("./assets/fonts/OpenSans-BoldItalic.ttf"),
    "open-sans-extraBold": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    "open-sans-extraBoldItalic": require("./assets/fonts/OpenSans-ExtraBoldItalic.ttf"),
    "open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf"),
    "open-sans-light": require("./assets/fonts/OpenSans-Light.ttf"),
    "open-sans-lightItalic": require("./assets/fonts/OpenSans-LightItalic.ttf"),
    "open-sans-regular": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-semiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semiBoldItalic": require("./assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <ShopNavigator />
      </PaperProvider>
    </Provider>
  );
}
