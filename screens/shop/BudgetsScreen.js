import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import BudgetCarousel from "../../components/carousell/BudgetCarousel";
import MonthCarousel from "../../components/carousell/MonthCarousel";
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "../../store/actions/budgets";
import * as costCategoriesActions from "../../store/actions/costCategories";
import CustomText from "@CustomText";
import Colors from "@Styles/colors";
import Fonts from "@Styles/fonts";
import Styles from "@Styles/styles";
import { List, Text, Chip, Divider, IconButton } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Card from "@UIComponents/Card";
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
} from "@Styles/presentation";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateMonthArrayFromMonth,
  getDayOfMonthFromDate,
  generateMonthArrayList,
} from "@Utils/dates";
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const BudgetsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isFocus, setFocus] = useState(true);
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [monthIndex, setMonthsIndex] = useState(0);
  const budgets = useSelector((state) => state.budgets);
  const dispatch = useDispatch();
  //const monthsList = moment.monthsShort();
  const monthsList = generateMonthArrayList();

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

  const handleBudgetSwipeCallback = (childData) => {
    setBudgetIndex(childData);
  };

  const handleMonthsSwipeCallback = (childData) => {
    setMonthsIndex(childData);
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

  const renderItem = ({ item }) => {
    return (
      // <Card style={styles.costSnapShotContainer}>
      //   <View>
      //     <CustomText.RegularText
      //       style={Styles.modalTitleText}
      //       color={Colors.p1}
      //       text={`Date: ${item.dateTime}`}
      //       fontSize={Fonts.medium}
      //     />
      //   </View>
      //   <View>
      //     <CustomText.RegularText
      //       color={Colors.p1}
      //       text={`Date: ${item.dateTime}`}
      //       fontSize={Fonts.small}
      //     />
      //     <CustomText.RegularText
      //       color={Colors.p1}
      //       text={`Amount: ${item.amount.toFixed(2)}`}
      //       fontSize={Fonts.small}
      //     />
      //   </View>
      // </Card>
      <View>
       <Divider />
       <List.Section>
         <List.Subheader>{item.dateTime}</List.Subheader>
         <List.Item
           left={() => (
            <IconButton icon="camera" size={24} onPress={() => {}} />
           )}
           right={(props) => <List.Icon {...props} icon="information" />}
           title={`Amount: ${item.amount.toFixed(2)}`}
           //description="Describes item 1"
         />
       </List.Section>
       <Divider />
       </View>
    );
  };

  const costSnapShots = budgets.budgets[budgetIndex].costSnapShots;
  console.log("budgetsScreen::costSnapShots::" + JSON.stringify(costSnapShots));
  return (
    <SafeAreaView>
      <CustomText.SemiBoldText
        text={`Item ${budgets.budgets[budgetIndex].name}`}
        color={Colors.p1}
        fontSize={Fonts.medium}
      />
      <View style={styles.mainContent}>
        <MonthCarousel
          data={monthsList}
          parentCallback={handleMonthsSwipeCallback}
          width={Dimensions.get("window").width}
          height={100}
        />
        <BudgetCarousel
          data={budgets.budgets}
          parentCallback={handleBudgetSwipeCallback}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").height * 0.4}
        />
        <FlatList
          data={budgets.budgets[budgetIndex].costSnapShots}
          keyExtractor={(item) => item.dateTime}
          renderItem={renderItem}
        />
       
        <Pagination
          dotsLength={budgets.budgets[budgetIndex].costSnapShots.length}
          activeDotIndex={budgetIndex}
          dotStyle={styles.paginationDot}
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
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 100,
  },
  costSnapShotContainer: {
    ...Styles.costSnapShotContainer,
  },
  paginationContainer: {
    height: 50,
  },
  paginationDot: {
    ...Styles.paginationDot,
  },
  image: {
    height: 40,
    width: 40,
    margin: 8,
  },
});
export default BudgetsScreen;
