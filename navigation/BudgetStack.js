import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import BudgetsScreen from "@BudgetScreens/BudgetsScreen";
import EditCostCategoryItemScreen from "@BudgetScreens/EditCostCategoryItemScreen";
import EditCostCategoryListScreen from "@BudgetScreens/EditCostCategoryListScreen";
import EditCostItemScreen from "@BudgetScreens/EditCostItemScreen";
import EditBudgetScreen from "@BudgetScreens/EditBudgetScreen";
import i18n from "@I18N/i18n";
import { withTheme, useTheme, Button } from "react-native-paper";
import Colors from "@Styles/colors";

const Stack = createStackNavigator();

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Feed Screen</Text>
//     </View>
//   );
// }

const BudgetStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: Colors.white },
      }}
    >
      <Stack.Screen
        name="BudgetsScreen"
        component={BudgetsScreen}
        options={{ title: i18n.t("budget.title") }}
      />
      <Stack.Screen
        name="EditBudgetScreen"
        component={EditBudgetScreen}
        options={{ title: i18n.t("editBudget.title") }}
      />
      <Stack.Screen
        name="EditCostCategoryScreen"
        component={EditCostCategoryItemScreen}
        options={{ title: i18n.t("addCostCategory.title") }}
      />
      <Stack.Screen
        name="EditCostCategoryListScreen"
        component={EditCostCategoryListScreen}
        options={{ title: i18n.t("editCostCategory.title") }}
      />
      <Stack.Screen
        name="EditCostItemScreen"
        component={EditCostItemScreen}
        options={{ title: i18n.t("editCostItem.title") }}
      />
    </Stack.Navigator>
  );
};

export default withTheme(BudgetStack);
