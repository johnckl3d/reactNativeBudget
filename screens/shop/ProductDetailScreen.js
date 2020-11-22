import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const costCategoryId = props.navigation.getParam("costCategoryId");
  const selectedProduct = useSelector((state) =>
    state.costCategories.costCategories.find(
      (prod) => prod.costCategoryId === costCategoryId
    )
  );
  const dispatch = useDispatch();

  const selectItemHandler = (costItemsId, name, totalAmount) => {
    console.log(costItemsId);
    // props.navigation.navigate("ProductDetail", {
    //   costCategoryId: costCategoryId,
    //   name: name,
    //   totalAmount: totalAmount
    // });
  };

  const deleteItemHandler = (costItemsId, name) => {
    Alert.alert('Are you sure?', `Do you really want to delete ${name}?`, [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
         
        }
      }
    ]);
  };

  return (
    <FlatList
      data={selectedProduct.costItems}
      keyExtractor={(item) => item.costItemsId}
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
                itemData.item.costItemsId,
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
                itemData.item.costItemsId,
                itemData.item.name
              );
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("name"),
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
    fontFamily: "open-sans-bold",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
