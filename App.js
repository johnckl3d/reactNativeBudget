import React, { useState,useEffect } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import budgetsReducer from "./store/reducers/budgets";
import costCategoriesReducer from "./store/reducers/costCategories";
import {
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import RootNavigator from "./navigation/RootNavigator";
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
  Theme,
} from "react-native-paper";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const PREFERENCES_KEY = "APP_PREFERENCES";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    accent: "yellow",
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
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isStateLoaded, setStateLoaded] = useState(false);
  const [initialState, setInitialState] = useState(InitialState);

  const [theme, setTheme] = useState(DefaultTheme);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || '');

        setInitialState(state);
      } catch (e) {
        // ignore error
      } finally {
        setStateLoaded(true);
      }
    };

    if (!isStateLoaded) {
      restoreState();
    }
  }, [isStateLoaded]);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
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
      setFontLoaded(true);
    };
    loadFonts();
  }, [isFontLoaded]);

  useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
        const preferences = JSON.parse(prefString || '');

        if (preferences) {
          // eslint-disable-next-line react/no-did-mount-set-state
          setTheme(preferences.theme === 'dark' ? DarkTheme : DefaultTheme);
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  if (!isFontLoaded || !isStateLoaded) {
    return (
      // <AppLoading
      //   startAsync={fetchFonts}
      //   onFinish={() => {
      //     setFontLoaded(true);
      //   }}
      // />
      <View></View>
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigator />
      </PaperProvider>
    </Provider>
  );
}
