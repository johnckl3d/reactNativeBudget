import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BudgetsScreen from "../screens/budget/BudgetsScreen";
import EditCostCategoryScreen from "../screens/budget/EditCostCategoryScreen";
import EditCostItemScreen from "../screens/budget/EditCostItemScreen";
import Colors from "../constants/Colors";
//import BudgetStack from './BudgetStack';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "OpenSans-Bold",
  },
  headerBackTitleStyle: {
    fontFamily: "OpenSans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    Budget: BudgetsScreen,
    EditCostCategory: EditCostCategoryScreen,
    EditCostItem: EditCostItemScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Icon
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const RootNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(RootNavigator);
