import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, PreferencesContext } from "@Context/Context";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import React, { useEffect, useState, useMemo } from "react";
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
import AuthStack from "@Navigation/AuthStack";

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
    accent: Colors.accent,
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
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [theme, setTheme] = useState(CustomDefaultTheme);
  const login = useSelector((store) => store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const accessToken = await getStringData(STORAGE.ACCESS_TOKEN);
        if (accessToken) {
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
        const prefString = await AsyncStorage.getItem(KEY.PREFERENCES_KEY);
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

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  Icon.loadFont();

  if (!isStateLoaded) {
    return <SplashScreen />;
  }

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: (props) => <Icon {...props} />,
        }}
      >
        <SafeAreaProvider>
          <AuthProvider>
            <React.Fragment>
              <NavigationContainer
              // initialState={initialState}
              // onStateChange={(state) =>
              //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
              // }
              >
                {login.accessToken ? <Main /> : <AuthStack />}
              </NavigationContainer>
            </React.Fragment>
          </AuthProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
});

export default AppWrapper;
