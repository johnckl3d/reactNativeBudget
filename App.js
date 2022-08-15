import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, PreferencesContext } from "@Context/Context";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import * as Font from "expo-font";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
import DrawerStack from "./navigation/DrawerStack";
import reducer from "@Reducers/index";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "./screens/SplashScreen";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import Colors from "@Styles/colors";
import { centered } from "@Styles/presentation";
import ProfileScreen from "@MiscScreens/ProfileScreen";
import SupportScreen from "@MiscScreens/SupportScreen";
import SettingsScreen from "@MiscScreens/SettingsScreen";
import { AuthProvider } from "@Context/AuthContext";
import { STORAGE } from "@Constants/storage";
import { getStringData } from "@Utils/storageUtils";
import { LOGIN, RETRIEVE_TOKEN, LOGOUT, REGISTER } from "@Actions/login";
import { validateJwtExpiryDateIsExpired } from "@Utils/tokenUtils";

const PERSISTENCE_KEY = "NAVIGATION_STATE";
const PREFERENCES_KEY = "APP_PREFERENCES";

const DrawerSetup = (props) => {
  // return (
  //   <PreferencesContext.Consumer>
  //     {(preferences) => (
  //       <DrawerContent
  //         toggleTheme={preferences.toggleTheme}
  //         isDarkTheme={preferences.theme === DarkTheme}
  //       />
  //     )}
  //   </PreferencesContext.Consumer>
  // );
  //console.log("app::drawer::" + JSON.stringify(props));
  return <DrawerContent {...props} />;
};

const Drawer = createDrawerNavigator();

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isStateLoaded, setStateLoaded] = useState(false);
  const [initialState, setInitialState] = useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = useState();
  const [theme, setTheme] = useState(CustomDefaultTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const accessToken = await getStringData(STORAGE.ACCESS_TOKEN);
        console.log("App.js::getasyncstorage::accessToken::" + accessToken);
        if (accessToken) {
          console.log(
            "app::validateJwtExpiryDate::" +
              validateJwtExpiryDateIsExpired(accessToken)
          );
          if (!validateJwtExpiryDateIsExpired(accessToken)) {
            dispatch({
              type: LOGIN,
              refreshToken: accessToken,
              accessToken: accessToken,
            });
          }
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
    const loadResourcesAndDataAsync = async () => {
      try {
        const openSansFonts = async () => {
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
        };
        const fontAwesome = (fonts) => {
          return fonts.map((font) => Font.loadAsync(font));
        };
        openSansFonts();
        fontAwesome([FontAwesome.font]);
        await Promise.all([...openSansFonts, ...fontAwesome]);
      } catch (e) {
      } finally {
        setFontLoaded(true);
      }
    };

    loadResourcesAndDataAsync();
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

  const accessToken = useSelector((state) => state.login.accessToken);
  if (!isFontLoaded || !isStateLoaded) {
    return <SplashScreen />;
  }
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <PreferencesContext.Provider value={preferences}>
            <AuthProvider>
              <React.Fragment>
                <NavigationContainer
                  initialState={initialState}
                  onStateChange={(state) =>
                    AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
                  }
                >
                  {accessToken ? (
                    <Stack.Navigator>
                      <Stack.Screen name="Drawer" component={DrawerStack} />
                      <Stack.Screen name="Home" component={BudgetStack} />
                    </Stack.Navigator>
                  ) : (
                    <AuthStack />
                  )}
                </NavigationContainer>
              </React.Fragment>
            </AuthProvider>
          </PreferencesContext.Provider>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
});

export default AppWrapper;
