import * as React from "react";
import { Appbar } from 'react-native-paper';
//import { DrawerNavigationProp } from '@react-navigation/drawer';
import { View, Text, Button } from "react-native";
// import {
//     createStackNavigator
//   } from 'react-navigation-stack';
import { createStackNavigator } from "@react-navigation/stack";
//import ExampleList, { examples } from './ExampleList';
//import { NavigationContainer } from '@react-navigation/native'
import BudgetsScreen from '../screens/shop/BudgetsScreen';
import CostCategoriesScreen from '../screens/shop/CostCategoriesScreen';
import CostItemsScreen from '../screens/shop/CostItemsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import EditCostCategoryScreen from '../screens/shop/EditCostCategoryScreen';
import EditCostItemScreen from '../screens/shop/EditCostItemScreen';

const Stack = createStackNavigator();

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

export default function BudgetStack() {
  return (
  
    <Stack.Navigator
    headerMode="screen"
    screenOptions={{
      header: ({ navigation, scene, previous }) => (
        <Appbar.Header>
          {previous ? (
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          ) : navigation.openDrawer ? (
            <Appbar.Action
              icon="menu"
              onPress={() =>
                navigation.openDrawer()
              }
            />
          ) : null}
          <Appbar.Content title={scene.descriptor.options.title} />
        </Appbar.Header>
      ),
    }}
  >
      <Stack.Screen name="BudgetsScreen" component={BudgetsScreen}  options={{ title: 'Budgets Screen' }}/>
      <Stack.Screen name="CostItemsScreen" component={CostItemsScreen}  options={{ title: 'CostItemsScreen' }}/>
      <Stack.Screen name="EditCostCategoryScreen" component={EditCostCategoryScreen}  options={{ title: 'EditCostCategoryScreen' }}/>
      <Stack.Screen name="EditCostItemScreen" component={EditCostItemScreen}  options={{ title: 'EditCostItemScreen' }}/>
      <Stack.Screen name="CartScreen" component={CartScreen}  options={{ title: 'CartScreen' }}/>
    </Stack.Navigator>
  );
}

// CostCategory: CostCategoriesScreen,
// ProductDetail: CostItemsScreen,
// EditCostCategory: EditCostCategoryScreen,
// EditCostItem: EditCostItemScreen,
// Cart: CartScreen,