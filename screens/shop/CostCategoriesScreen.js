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
import Chart from "../../components/UI/Chart";

const CostCategoriesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const costCategories = useSelector((state) => state.costCategories);
  const dispatch = useDispatch();

 

  const loadCostCategories = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(costCategoriesActions.fetchCostCategories());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadCostCategories();
  }, [dispatch, loadCostCategories]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCostCategories
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadCostCategories]);

  const selectItemHandler = (costCategoryId, name, totalAmount) => {
    props.navigation.navigate("ProductDetail", {
      costCategoryId: costCategoryId,
      name: name,
      totalAmount: totalAmount,
    });
  };

  const deleteItemHandler = (costCategoryId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteProducts(costCategoryId);
        },
      },
    ]);
  };

  const deleteProducts = useCallback(
    async (costCategoryId) => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(costCategoriesActions.deleteProduct(costCategoryId));
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
      loadCostCategories();
    },
    [dispatch, setIsLoading, setError]
  );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadCostCategories}
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

  if (!isLoading && costCategories.costCategories === 0) {
    return (
      <View style={styles.centered}>
        <Text> No cost category found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={costCategories.costCategories}
        keyExtractor={(item) => item.costCategoryId}
        renderItem={(itemData) => (
          <ProductItem
            image={"https://picsum.photos/200/300"}
            title={itemData.item.name}
            price={itemData.item.totalAmount}
            onSelect={() => {
              selectItemHandler(
                itemData.item.costCategoryId,
                itemData.item.name,
                itemData.item.totalAmount
              );
            }}
          >
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => {
                selectItemHandler(
                  itemData.item.costCategoryId,
                  itemData.item.name,
                  itemData.item.totalAmount
                );
              }}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => {
                deleteItemHandler(
                  itemData.item.costCategoryId,
                  itemData.item.name
                );
              }}
            />
          </ProductItem>
        )}
      />
    </SafeAreaView>
  );
};

CostCategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Cost Category",
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
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
export default CostCategoriesScreen;
