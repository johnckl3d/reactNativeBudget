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
import ProfileScreen from "@MiscScreens/ProfileScreen";
import SupportScreen from "@MiscScreens/SupportScreen";
import SettingsScreen from "@MiscScreens/SettingsScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { PreferencesContext } from "@Context/Context";
import i18n from "@I18N/i18n";

const DrawerScreen = (props) => {
  console.log("DrawerScreen::" + JSON.stringify(props));
  const dispatch = useDispatch();
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);

  const calculateGainLoss = () => {
    var gain = 0;
    var loss = 0;
    var result = 0;

    budgets.forEach((budget) => {
      gain += budget.totalBudgetAmount;
      loss += Math.abs(budget.totalCostAmount);
    });

    result = gain - loss;

    return result;
  };

  const signOutHandler = useCallback(
    async (accessToken) => {
      try {
        console.log("signout");
        await dispatch(loginActions.logout(accessToken));
      } catch (err) {}
    },
    [dispatch]
  );
  console.log("budgets::count::" + budgets.count);
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{login.userId}</Title>
                <Caption style={styles.caption}>{login.emailAdd}</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {budgets.length}
                </Paragraph>
                <Caption style={styles.caption}>
                  {i18n.t("drawer.budgetCount")}
                </Caption>
              </View>
              <View style={styles.section}>
                <Paragraph
                  style={[
                    {
                      color:
                        Math.sign(calculateGainLoss()) === -1 ? "red" : "green",
                    },
                    styles.paragraph,
                    styles.caption,
                  ]}
                >
                  {calculateGainLoss()}
                </Paragraph>
                <Caption style={styles.caption}>Gain/Loss</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Budget");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="account-settings-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("Support");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="trash-can-outline" color={color} size={size} />
              )}
              label="Account Deletion"
              onPress={() => {
                props.navigation.navigate("AccountDeletion");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isThemeDark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOutHandler(login.refreshToken);
          }}
        />
      </Drawer.Section>
    </View>
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

export default withTheme(DrawerScreen);
