import * as loginActions from "@Actions/login";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
  withTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Appbar } from "react-native-paper";
import DrawerScreen from "@DrawerScreen/DrawerScreen";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import BudgetStack from "@Navigation/BudgetStack";
import AuthStack from "@Navigation/AuthStack";

const Main = (props) => {
  console.log("DrawerStack::" + JSON.stringify(props));
  const Drawer = createDrawerNavigator();
  //const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector((store) => store.login);
  //const accessToken = useSelector((state) => state.login.accessToken);
  const signOutHandler = useCallback(
    async (accessToken) => {
      try {
        await dispatch(loginActions.logout(accessToken));
      } catch (err) {}
    },
    [dispatch]
  );

  return (
    <NavigationContainer
    // initialState={initialState}
    // onStateChange={(state) =>
    //   AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
    // }
    >
      {login.accessToken ? (
        <Drawer.Navigator
          initialRouteName="Budget"
          //useLegacyImplementation={true}
          //headerMode="screen"
          drawerContent={(props) => <DrawerScreen {...props} />}
          screenOptions={{
            header: ({ navigation, scene, previous }) => (
              <Appbar.Header>
                {previous ? (
                  <Appbar.BackAction onPress={() => navigation.goBack()} />
                ) : navigation.openDrawer ? (
                  <Appbar.Action
                    icon="menu"
                    onPress={() => {
                      console.log("pressed");
                      console.log(JSON.stringify(navigation));
                      navigation.openDrawer();
                    }}
                  />
                ) : null}
                <Appbar.Content title={"johntest"} />
              </Appbar.Header>
            ),
          }}
        >
          <Drawer.Screen name="Budget" component={BudgetStack} />
        </Drawer.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default withTheme(Main);
