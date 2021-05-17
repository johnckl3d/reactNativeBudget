import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import BudgetCarousel from "../../components/carousell/BudgetCarousel";
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "../../store/actions/budgets";
import * as costCategoriesActions from "../../store/actions/costCategories";
import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselStyles from "../../components/carousell/styles";
import {
  column,
  row,
  highlightRed,
  highlightYellow,
  centered,
  shadow,
  bottom,
  centeredStretch,
  highlightGreen,
} from "../../styles/presentation";
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const BudgetsScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isFocus, setFocus] = useState(true);
  const [activeIndex, setIndex] = useState(0);
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
    setFocus(true);
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

  const handleCallback = (childData) => {
    console.log("handleCallback");
    setIndex(childData);
  };

  const selectItemHandler = (costCategoryId, name, totalAmount) => {
    setFocus(false);
    props.navigation.navigate("CostCategory", {
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
    console.log(error);
    return (
      <View style={styles.centered}>
        <Text> An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadBudgets}
          color={Colors.p1}
        ></Button>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.p1}></ActivityIndicator>
      </View>
    );
  }

  if (!isLoading && budgets.budgets.length == 0) {
    return (
      <View style={styles.centered}>
        <Text> No budgets found. Maybe start adding some!</Text>
      </View>
    );
  }

  if (!isFocus) {
    return <View />;
  }

  console.log(
    "budgets::budgets::" +
      JSON.stringify(budgets.budgets[activeIndex].costSnapShots)
  );
  console.log("budgetScreen::" + activeIndex);
  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <BudgetCarousel
          data={budgets.budgets}
          parentCallback={handleCallback}
        />
        <CustomText.SemiBoldText
          text={`Item ${budgets.budgets[activeIndex].name}`}
          color={Colors.p1}
          fontSize={Fonts.medium}
        />
        <FlatList
          data={budgets.budgets[activeIndex].costSnapShots}
          keyExtractor={(item) => item.dateTime}
          renderItem={(item) => (
            <View>
              {/* <Text>{item.dateTime.toString()}</Text> */}
              <CustomText.RegularText
                text={item.dateTime}
                color={Colors.b7}
                fontSize={Fonts.medium}
              />
              {/* <CustomText.RegularText
                text={item.amount.toFixed(2)}
                color={Colors.b7}
                fontSize={Fonts.medium}
              /> */}
            </View>
          )}
        />
        <Pagination
          dotsLength={budgets.budgets[activeIndex].costSnapShots.length}
          activeDotIndex={activeIndex}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: Colors.p1,
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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
  centered: { ...centered, flex: 1 },
  mainContent: {
    ...centered,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100,
  },
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
  paginationContainer: {
    //backgroundColor: Colors.p1,
    height: 50,
    ...highlightGreen,
  },
});
export default BudgetsScreen;
