import Colors from "@Styles/colors";
import { centered } from "@Styles/presentation";
import Styles from "@Styles/styles";
import { generateMonthRange } from "@Utils/dates";
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
import BudgetCarousel from "@Carousel/BudgetCarousel";
import MonthCarousel from "@Carousel/MonthCarousel";
import BudgetAccordion from "@Accordion/BudgetAccordion";
import HeaderButton from "@UIComponents/HeaderButton";
import MediumCurrencyText from "@UIComponents/MediumCurrencyText";
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
import { useDrawerStatus } from "@react-navigation/drawer";
import { useIsFocused } from "@react-navigation/native";
import ACTION_TYPES from "@Actions/actionTypes";
import { nFormatter } from "@Utils/commonUtils";

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const isOutlined = false;
const mode = isOutlined ? "outlined" : "elevated";

const BudgetsScreen = (props) => {
  const [isShowFAB, setIsShowFAB] = useState(true);
  const dispatch = useDispatch();
  const isDrawerOpen = useDrawerStatus() === "open";
  const isFocused = useIsFocused();
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const selectedBudgetIndex = FSM.selectedBudgetIndex;

  useEffect(() => {
    console.log("BudgetsScreen::isDrawerOpen::" + isDrawerOpen);
    console.log("BudgetsScreen::isFocused::" + isFocused);
    if (isDrawerOpen || !isFocused) {
      setIsShowFAB(false);
    } else {
      setIsShowFAB(true);
    }
  }, [isDrawerOpen, isFocused]);

  useEffect(() => {
    dispatch(budgetsActions.fetchBudgets(login.accessToken));
    //loadBudgets();
  }, [dispatch]);

  const loadBudgets = useCallback(async () => {
    try {
      await dispatch(budgetsActions.fetchBudgets(login.accessToken));
      setFocus(true);
    } catch (err) {}
  }, [dispatch]);

  const selectItemHandler = (costCategoryId, name, totalAmount) => {
    setFocus(false);
    props.navigation.navigate("CostCategory", {
      costCategoryId: costCategoryId,
      name: name,
      totalAmount: totalAmount,
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

  if (FSM.hasError && FSM.hasError != "") {
    Alert.alert("Error!", FSM.hasError, [
      { text: "Okay", onPress: () => handleCloseError() },
    ]);
  }

  const handleCloseError = () => {
    dispatch({ type: ACTION_TYPES.SET_ERROR, hasError: "" });
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

  if (budgets.length == 0) {
    return (
      <View style={[styles.centered, { flex: 1 }]}>
        <Text>{i18n.t("budget.noBudget")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContent}>
        <Card mode={mode}>
          <Card mode={mode}>
            <Card.Title
              title={budgets ? budgets[selectedBudgetIndex].name : ""}
              subtitle={budgets ? budgets[selectedBudgetIndex].description : ""}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {
                    editBudgetHandler(budgets[selectedBudgetIndex].budgetId);
                  }}
                />
              )}
            />

            <Card.Content style={styles.summary}>
              <View style={styles.centered}>
                <MediumCurrencyText
                  value={
                    budgets
                      ? nFormatter(
                          budgets[selectedBudgetIndex].totalBudgetAmount
                        )
                      : ""
                  }
                  colorCode={false}
                />
                <Caption>Budget</Caption>
              </View>
              <View style={styles.centered}>
                <MediumCurrencyText
                  value={
                    budgets
                      ? nFormatter(budgets[selectedBudgetIndex].totalCostAmount)
                      : ""
                  }
                  colorCode={false}
                />
                <Caption>Cost</Caption>
              </View>
              <View style={styles.centered}>
                <MediumCurrencyText
                  value={
                    budgets
                      ? nFormatter(
                          budgets[selectedBudgetIndex].totalBudgetAmount -
                            budgets[selectedBudgetIndex].totalCostAmount
                        )
                      : ""
                  }
                  colorCode={true}
                />
                <Caption>Gain/Loss</Caption>
              </View>
            </Card.Content>
          </Card>
          <BudgetCarousel data={budgets} width={wp(100)} height={hp(30)} />
          <MonthCarousel />
        </Card>
        <BudgetAccordion
          costCategories={
            budgets ? budgets[selectedBudgetIndex].costCategories : ""
          }
          deleteCallback={deleteCostCategoryHandler}
        ></BudgetAccordion>
        <Pagination
          dotsLength={budgets.length}
          activeDotIndex={selectedBudgetIndex}
          dotStyle={styles.paginationDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <FloatingActionButton
          visible={isShowFAB}
          navigation={props.navigation}
        ></FloatingActionButton>
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
