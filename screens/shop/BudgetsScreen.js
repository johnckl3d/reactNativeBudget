import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableNativeFeedback,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";
import * as costCategoriesActions from "../../store/actions/costCategories";
import * as budgetsActions from "../../store/actions/budgets";
import Chart from "../../components/UI/Chart";

const BudgetsScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const budgets = useSelector((state) => state.budgets);
  const dispatch = useDispatch();

  const loadBudgets = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(budgetsActions.fetchBudgets());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadBudgets();
  }, [dispatch, loadBudgets]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadBudgets);
    return () => {
      willFocusSub.remove();
    };
  }, [loadBudgets]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadBudgets}
          color={Colors.primary}
        ></Button>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && budgets.budgets.length == 0) {
    return (
      <View style={styles.centered}>
        <Text> No cost category found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <Text style={styles.title}>{budgets.budgets[0].name}</Text>
        <Chart snapshots={budgets.budgets[0].costSnapShots} />
        <Button style={styles.button} color={Colors.primary} title="Edit" />
        <Button style={styles.button} color={Colors.primary} title="Delete" />
      </View>
    </SafeAreaView>
  );
};

BudgetsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Budget",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={
            Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
          }
          onPress={() => {
            navData.navigation.navigate("EditCostCategory");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {justifyContent: "center", alignItems: "center", flex: 1},
  mainContent: { height: 600, justifyContent: "space-between", alignItems: "center"},
  button: {
    height: 50,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2,
    height: 30,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
});
export default BudgetsScreen;
