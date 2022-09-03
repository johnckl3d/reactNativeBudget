import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, PreferencesContext } from "@Context/Context";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import {
  configureFonts,
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import Main from "@Navigation/Main";
import configureAppStore from "@Store/configureAppStore";
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
import { AuthProvider } from "@Context/AuthContext";
import { STORAGE } from "@Constants/storage";
import { getStringData } from "@Utils/storageUtils";
import { validateJwtExpiryDateIsExpired } from "@Utils/tokenUtils";
import "react-native-gesture-handler";

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

const fontConfig = {
  web: {
    regular: {
      fontFamily: "OpenSans",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans-Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "OpenSans",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans-Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "OpenSans",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "OpenSans-Bold",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "OpenSans-Light",
      fontWeight: "normal",
    },
  },
};

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
    primary: Colors.primary,
  },
  fonts: configureFonts(fontConfig),
  userDefinedThemeProperty: "",
  animation: {
    ...DefaultTheme.animation,
    customProperty: 1,
  },
};

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducer,
//   composeEnhancers(applyMiddleware(ReduxThunk))
// );

const AppWrapper = () => {
  return (
    <Provider store={configureAppStore()}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [isStateLoaded, setStateLoaded] = useState(false);
  const [initialState, setInitialState] = useState();
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
              type: ACTION_TYPES.SET_LOGIN,
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

  Icon.loadFont();

  if (!isStateLoaded) {
    return <SplashScreen />;
  }

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: (props) => <Icon {...props} />,
      }}
    >
      <SafeAreaProvider>
        <PreferencesContext.Provider value={preferences}>
          <AuthProvider>
            <React.Fragment>
              <Main />
            </React.Fragment>
          </AuthProvider>
        </PreferencesContext.Provider>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
});

export default AppWrapper;
