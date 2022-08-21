import Colors from "@Styles/colors";
import { centered } from "@Styles/presentation";
import Styles from "@Styles/styles";
import { generateMonthArrayList } from "@Utils/dates";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from "react-native-paper";
import { Pagination } from "react-native-snap-carousel";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import BudgetCarousel from "../../components/carousell/BudgetCarousel";
import MonthCarousel from "../../components/carousell/MonthCarousel";
import BudgetAccordion from "@Accordion/BudgetAccordion";
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "@Actions/budgets";
import * as costCategoriesActions from "@Actions/costCategories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import FloatingActionButton from "../../navigation/FloatingActionButton";
import moment from "moment";
import { highlightRed } from "../../styles/presentation";
import { connect } from "react-redux";
import i18n from "@I18N/i18n";
import { useIsFocused } from "@react-navigation/native";
import { SET_ERROR, SET_LOADING } from "@Actions/FSM";

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const isOutlined = false;
const mode = isOutlined ? "outlined" : "elevated";

const BudgetsScreen = (props) => {
  const token = useSelector((store) => store.login.accessToken);
  const [isFocus, setFocus] = useState(true);
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [monthIndex, setMonthsIndex] = useState(0);
  const dispatch = useDispatch();
  const monthsList = generateMonthArrayList();
  const theme = useTheme();
  const isFocused = useIsFocused();

  const budgets = useSelector((store) => store.budgets);
  console.log("BudgetScreen::budgets::" + JSON.stringify(budgets));
  const FABActions = [
    {
      icon: "plus",
      label: i18n.t("budget.addCostItem"),
      onPress: () => {
        addCostItemHandler(budgets[budgetIndex].budgetId);
      },
    },
    {
      icon: "email",
      label: i18n.t("budget.addCategory"),
      onPress: () => {
        addCostCategoryHandler(budgets[budgetIndex].budgetId);
      },
    },
    {
      icon: "star",
      label: i18n.t("budget.deleteBudget"),
      onPress: () => {
        deleteBudgetHandler(
          budgets[budgetIndex].budgetId,
          budgets[budgetIndex].name
        );
      },
    },
    {
      icon: "bell",
      label: i18n.t("budget.addBudget"),
      onPress: () => {
        addBudgetHandler();
      },
    },
  ];

  useEffect(() => {
    //loadBudgets();
    dispatch(budgetsActions.fetchBudgets(token));
  }, []);

  // const signInHandler = useCallback(
  //   async (userId, password) => {
  //     try {
  //       await dispatch(loginActions.login(userId, password));
  //     } catch (err) {}
  //   },
  //   [dispatch]
  // );

  const loadBudgets = useCallback(async () => {
    try {
      await dispatch(budgetsActions.fetchBudgets(token));
      console.log("BudgetsScreen:1::");
      setFocus(true);
    } catch (err) {
      console.log("BudgetsScreen:3::" + err);
    }
  }, [dispatch]);

  const handleBudgetSwipeCallback = (childData) => {
    if (childData >= budgets[budgetIndex].length - 1) {
      setBudgetIndex(0);
    }
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

  const addCostItemHandler = (budgetId) => {
    props.navigation.navigate("EditCostItemScreen", { budgetId: budgetId });
  };

  const addCostCategoryHandler = (budgetId) => {
    props.navigation.navigate("EditCostCategoryScreen", {
      budgetId: budgetId,
      onComplete: loadBudgets,
    });
  };

  const deleteCostCategoryHandler = (costCategoryId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteCostCategory(costCategoryId);
        },
      },
    ]);
  };

  const deleteCostCategory = useCallback(
    async (budgetId) => {
      dispatch(costCategoriesActions.deleteCostCategory(budgetId));
      loadBudgets();
    },
    [dispatch, loadBudgets]
  );

  const editBudgetHandler = (budgetId) => {
    props.navigation.navigate("EditBudgetScreen", { budgetId: budgetId });
  };

  const addBudgetHandler = () => {
    props.navigation.navigate("EditBudgetScreen");
  };

  const deleteBudgetHandler = (budgetId, name) => {
    Alert.alert("Are you sure?", `Do you really want to delete ${name}?`, [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          deleteBudget(budgetId);
        },
      },
    ]);
  };

  const deleteBudget = useCallback(
    async (budgetId) => {
      dispatch(budgetsActions.deleteBudget(budgetId));
    },
    [dispatch]
  );

  // console.log("budgets screen1::"+ JSON.stringify(props));
  // if (props.hasError) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text> An error occured!</Text>
  //       <Button
  //         title="Try again"
  //         onPress={loadBudgets}
  //         color={Colors.primary}
  //       ></Button>
  //     </View>
  //   );
  // }
  // if (props.isLoading) {
  //   console.log("props.isLoading");
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator
  //         size="large"
  //         color={Colors.primary}
  //       ></ActivityIndicator>
  //     </View>
  //   );
  // }

  if (budgets.length == 0) {
    console.log("BudgetScreen::budgets.length = 0");
    return (
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text> No budgets found. Maybe start adding some!</Text>
      </View>
    );
  }

  const handleCloseError = () => {
    console.log("SignInScreen::handleCloseError");
    dispatch({ type: SET_ERROR, hasError: "" });
  };

  if (FSM.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        ></ActivityIndicator>
      </View>
    );
  }

  if (FSM.hasError) {
    Alert.alert("Error!", FSM.hasError, [
      { text: "Okay", onPress: () => handleCloseError() },
    ]);
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <Card mode={mode}>
          <Card mode={mode}>
            <Card.Title
              title={budgets[budgetIndex].name}
              subtitle={budgets[budgetIndex].description}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {
                    editBudgetHandler(props.budgets[budgetIndex].budgetId);
                  }}
                />
              )}
            />

            <Card.Content style={styles.summary}>
              <View style={styles.centered}>
                <Subheading>
                  {i18n.t("common.currency") +
                    budgets[budgetIndex].totalBudgetAmount.toFixed(2)}
                </Subheading>
                <Caption>Budget</Caption>
              </View>
              <View style={styles.centered}>
                <Subheading>
                  {i18n.t("common.currency") +
                    budgets[budgetIndex].totalCostAmount.toFixed(2)}
                </Subheading>
                <Caption>Cost</Caption>
              </View>
            </Card.Content>
          </Card>
          <BudgetCarousel
            data={budgets}
            parentCallback={handleBudgetSwipeCallback}
            width={Dimensions.get("window").width}
            height={Dimensions.get("window").height * 0.3}
          />
          <MonthCarousel
            data={monthsList}
            parentCallback={handleMonthsSwipeCallback}
            width={Dimensions.get("window").width}
          />
        </Card>
        <BudgetAccordion
          costCategories={budgets[budgetIndex].costCategories}
          deleteCallback={deleteCostCategoryHandler}
        ></BudgetAccordion>

        <FloatingActionButton
          visible={isFocused}
          actions={FABActions}
        ></FloatingActionButton>
        <Pagination
          dotsLength={budgets.length}
          activeDotIndex={budgetIndex}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centered: { ...centered, flex: 1 },
  summary: {
    flexDirection: "row",
    height: hp(9),
    alignItems: "stretch",
    justifyContent: "space-around",
  },
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
  subHeading: {
    marginHorizontal: wp(3),
    marginVertical: wp(3),
  },
});
export default BudgetsScreen;
