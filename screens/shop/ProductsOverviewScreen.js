import React, { useEffect } from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';
import * as costCategoriesActions from '../../store/actions/costCategories';


const ProductsOverviewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const costCategories = useSelector(state => state.costCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(costCategoriesActions.fetchCostCategories());
  }, [dispatch]);

  /*
  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };
  */
  return (
    <FlatList
        data={costCategories.costCategories}
        renderItem={(itemData) => (
          <ProductItem
          image={"https://picsum.photos/200/300"}
          title={itemData.item.name}
          price={itemData.item.totalAmount}
          />
        )}
      ></FlatList>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductsOverviewScreen;
