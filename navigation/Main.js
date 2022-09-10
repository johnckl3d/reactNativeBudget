import * as loginActions from "@Actions/login";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useCallback, useContext } from "react";
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
import { NavigationContainer, StackActions } from "@react-navigation/native";
import BudgetStack from "@Navigation/BudgetStack";
import { PreferencesContext } from "@Context/Context";
import ProfileScreen from "@MiscScreens/ProfileScreen";
import SupportScreen from "@MiscScreens/SupportScreen";
import SettingsScreen from "@MiscScreens/SettingsScreen";
import AccountDeletionScreen from "@MiscScreens/AccountDeletionScreen";

const Main = (props) => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const login = useSelector((store) => store.login);
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Budget"
      drawerContent={(props) => <DrawerScreen {...props} />}
      screenOptions={{
        header: ({ navigation, scene, previous }) => (
          <Appbar.Header
            theme={{
              colors: {
                primary: isThemeDark
                  ? theme?.colors.primary
                  : theme?.colors.primary,
              },
            }}
          >
            {previous ? (
              <Appbar.BackAction onPress={() => navigation.goBack()} />
            ) : navigation.openDrawer ? (
              <Appbar.Action
                icon="menu"
                onPress={() => {
                  navigation.openDrawer();
                }}
              />
            ) : null}
            {/* <Appbar.Content title={scene?.route?.name} /> */}
            <Appbar.Content title={"Welcome, " + login.userId} />
          </Appbar.Header>
        ),
      }}
    >
      <Drawer.Screen name="Budget" component={BudgetStack} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="AccountDeletion" component={AccountDeletionScreen} />
    </Drawer.Navigator>
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
