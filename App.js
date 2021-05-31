import AsyncStorage from "@react-native-community/async-storage";
import  {AuthContext} from "@Context/Context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
//import BudgetStack from "./navigation/BudgetStack";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
//import RootNavigator from "./navigation/RootNavigator";
import BudgetStack from "./navigation/BudgetStack";
import AuthStack from "./navigation/AuthStack";
import DrawerItems from "./navigation/DrawerItems";
import budgetsReducer from "./store/reducers/budgets";
import cartReducer from "./store/reducers/cart";
import costCategoriesReducer from "./store/reducers/costCategories";
import ordersReducer from "./store/reducers/orders";
import productsReducer from "./store/reducers/products";
import SplashScreen from "./screens/SplashScreen";
import { View, Text, StyleSheet, Button } from "react-native";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const PREFERENCES_KEY = "APP_PREFERENCES";

const PreferencesContext = React.createContext(null);

const DrawerContent = () => {
  return (
    <PreferencesContext.Consumer>
      {(preferences) => (
        <DrawerItems
          toggleTheme={preferences.toggleTheme}
          isDarkTheme={preferences.theme === DarkTheme}
        />
      )}
    </PreferencesContext.Consumer>
  );
};

const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    primary: "#5202FD",
  },
  fonts: {
    ...DefaultTheme.fonts,
    superLight: { ...DefaultTheme.fonts["light"] },
  },
  userDefinedThemeProperty: "",
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
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

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isStateLoaded, setStateLoaded] = useState(false);
  const [initialState, setInitialState] = useState();
  const [isLoading, setIsLoading] = React.useState(true);

  const [theme, setTheme] = useState(CustomDefaultTheme);

  const [userToken, setUserToken] = useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = JSON.parse(savedStateString || "");

        //const state = savedStateString ? savedStateString : null;

        if (state !== null) {
          setInitialState(state);
        }
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
        const preferences = JSON.parse(prefString || "");

        if (preferences) {
          // eslint-disable-next-line react/no-did-mount-set-state
          setTheme(preferences.theme === "dark" ? DarkTheme : DefaultTheme);
        }
      } catch (e) {
        // ignore error
      }
    };

    restorePrefs();
  }, []);

  const preferences = React.useMemo(
    () => ({
      toggleTheme: () =>
        setTheme((theme) =>
          theme === DefaultTheme ? DarkTheme : DefaultTheme
        ),
      theme,
    }),
    [theme]
  );

  if (!isFontLoaded || !isStateLoaded) {
    return <SplashScreen />;
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={preferences}>
            <React.Fragment>
            <AuthContext.Provider value={authContext}>
              <NavigationContainer
                initialState={initialState}
                onStateChange={(state) =>
                  AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                }
              >
                {userToken ? (
                    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
                      <Drawer.Screen name="Home" component={BudgetStack} />
                    </Drawer.Navigator>
                ) : (
                  <AuthStack />
                )}
              </NavigationContainer>
              </AuthContext.Provider>
            </React.Fragment>
          </PreferencesContext.Provider>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
