import Colors from "@Styles/colors";
import { centered } from "@Styles/presentation";
import Styles from "@Styles/styles";
import { generateMonthArrayList } from "@Utils/dates";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
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
  withTheme,
  FAB,
} from "react-native-paper";
import { Pagination } from "react-native-snap-carousel";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import BudgetCarousel from "../../components/carousell/BudgetCarousel";
import MonthCarousel from "../../components/carousell/MonthCarousel";
import BudgetAccordion from "@Accordion/BudgetAccordion";
import HeaderButton from "../../components/UI/HeaderButton";
import * as budgetsActions from "../../store/actions/budgets";
import * as costCategoriesActions from "../../store/actions/costCategories";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";
import FloatingActionButton from "../../navigation/FloatingActionButton";
import moment from "moment";
import { highlightRed } from "../../styles/presentation";
import { connect } from "react-redux";
import i18n from "@I18N/i18n";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useIsFocused } from "@react-navigation/native";
import ACTION_TYPES from "@Actions/actionTypes";

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const isOutlined = false;
const mode = isOutlined ? "outlined" : "elevated";

const BudgetsScreen = (props) => {
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [monthIndex, setMonthsIndex] = useState(0);
  const [isShowFAB, setIsShowFAB] = useState(true);
  const dispatch = useDispatch();
  const monthsList = generateMonthArrayList();
  const isDrawerOpen = useDrawerStatus() === "open";
  const isFocused = useIsFocused() === true;
  console.log("BudgetsScreen::FAB::isDrawerOpen0::" + useDrawerStatus());
  console.log("BudgetsScreen::FAB::isFocused0::" + useIsFocused());
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);

  useEffect(() => {
    if (isDrawerOpen || !isFocused) {
      setIsShowFAB(false);
    } else {
      setIsShowFAB(true);
    }
  }, [isDrawerOpen, isFocused]);

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
    dispatch(budgetsActions.fetchBudgets(login.accessToken));
    //loadBudgets();
  }, [dispatch]);

  const loadBudgets = useCallback(async () => {
    dispatch(budgetsActions.fetchBudgets());
    setFocus(true);
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

  const handleCloseError = () => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: "" });
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
    Alert.alert(
      i18n.t("budget.deleteBudgetHeader"),
      `Do you really want to delete ${name}?`,
      [
        { text: i18n.t("common.no"), style: "default" },
        {
          text: i18n.t("common.yes"),
          style: "destructive",
          onPress: () => {
            deleteCostCategory(costCategoryId);
          },
        },
      ]
    );
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

  if (FSM.hasError && FSM.hasError != "") {
    Alert.alert("Error!", FSM.hasError, [
      { text: "Okay", onPress: () => handleCloseError() },
    ]);
  }

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

  if (budgets.length == 0) {
    return (
      <View style={[styles.centered, { flex: 1 }]}>
        <Text>{i18n.t("budget.noBudget")}</Text>
      </View>
    );
  }
  console.log("BudgetsScreen::render::" + isShowFAB);
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
                    editBudgetHandler(budgets[budgetIndex].budgetId);
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
          style={styles.fab}
          actions={FABActions}
          visible={isShowFAB}
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
  fab: { position: "absolute", margin: 16, right: 0, bottom: 0 },
  summary: {
    flexDirection: "row",
    height: hp(9),
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  mainContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
export default withTheme(BudgetsScreen);
