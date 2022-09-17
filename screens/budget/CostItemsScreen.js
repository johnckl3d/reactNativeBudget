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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "@Styles/colors";
import * as costCategoriesActions from "../../store/actions/costCategories";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "@UIComponents/HeaderButton";

const CostItemsScreen = (props) => {
  const costCategoryId = props.navigation.getParam("costCategoryId");

  const selectedProduct = useSelector((state) =>
    state.costCategories.costCategories.find(
      (prod) => prod.costCategoryId === costCategoryId
    )
  );
  const costItems = useSelector(
    (state) =>
      state.costCategories.costCategories.find(
        (prod) => prod.costCategoryId === costCategoryId
      ).costItems
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadCostItems = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        costCategoriesActions.fetchCostItems(selectedProduct.costCategoryId)
      );
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadCostItems();
  }, [dispatch, loadCostItems]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCostItems
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadCostItems]);

  const selectItemHandler = (costCategoryId, costItemId, name, amount) => {
    props.navigation.navigate("EditCostItem", {
      costCategoryId: costCategoryId,
      costItemId: costItemId,
      name: name,
      amount: amount,
    });
  };

  const deleteItemHandler = (costCategoryId, costItemId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteCostItem(costCategoryId, costItemId);
        },
      },
    ]);
  };

  const deleteCostItem = useCallback(
    async (costCategoryId, costItemId) => {
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(
          costCategoriesActions.deleteCostItem(costCategoryId, costItemId)
        );
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
      loadCostItems();
    },
    [dispatch, setIsLoading, setError]
  );

  if (error) {
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadCostItems}
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

  if (!isLoading && selectedProduct === 0) {
    return (
      <View style={styles.centered}>
        <Text> No cost category found. Maybe start adding some!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={costItems}
      keyExtractor={(item) => item.costItemId}
      renderItem={(itemData) => (
        <ProductItem
          image={"https://picsum.photos/200/300"}
          title={itemData.item.name}
          price={itemData.item.amount}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              selectItemHandler(
                selectedProduct.costCategoryId,
                itemData.item.costItemId,
                itemData.item.name,
                itemData.item.amount
              );
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteItemHandler(
                selectedProduct.costCategoryId,
                itemData.item.costItemId,
                itemData.item.name
              );
            }}
          />
        </ProductItem>
      )}
    />
  );
};

CostItemsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("name"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={
            Platform.OS === "android" ? "md-add-circle" : "ios-add-circle"
          }
          onPress={() => {
            navData.navigation.navigate("EditCostItem", {
              costCategoryId: navData.navigation.getParam("costCategoryId"),
            });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "OpenSans-Bold",
  },
  description: {
    fontFamily: "OpenSans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default CostItemsScreen;
