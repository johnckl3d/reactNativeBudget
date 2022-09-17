import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { centered, highlightRed } from "@Styles/presentation";
import { animatedStyles, scrollInterpolator } from "../../utils/animations";
import Chart from "./Chart";
import ScreenWrapper from "@UIComponents/ScreenWrapper";
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
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateMondayStringFromMonth,
  getDayOfMonthFromDate,
  generateMonthRange,
  generateAmountFromMonth,
} from "@Utils/dates";
import ACTION_TYPES from "@Actions/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";

const BudgetCarousel = () => {
  const FSM = useSelector((store) => store.FSM);
  const selectedBudgetId = FSM.selectedBudgetId;
  const selectedBudgetMonth = FSM.selectedBudgetMonth;
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  // const budgetIndex = budgets.findIndex(
  //   (obj) => obj.budgetId === FSM.selectedBudgetId
  // );
  const graphDataAmount = FSM.graphDataAmount;
  const graphDataWeek = FSM.graphDataWeek;
  const [graphData, setGraphData] = useState({
    graphDataAmount: [],
    graphDataWeek: [],
  });
  const dispatch = useDispatch();

  const _renderItem = ({ item }) => {
    return (
      <Chart graphDataAmount={graphDataAmount} graphDataWeek={graphDataWeek} />
    );
  };

  useEffect(() => {
    console.log("BudgetCarousel::useeffect");
    var selectedBudgetId = budgets[0].budgetId;
    var costSnapShots = budgets[0].costSnapShots;
    dispatch({
      type: ACTION_TYPES.SET_BUDGETID,
      selectedBudgetId: selectedBudgetId,
    });

    var graphDataAmount = convertCostSnapShotsToWeekAmount(costSnapShots);
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
      graphDataAmount: graphDataAmount,
    });

    var graphDataWeek = convertCostSnapShotsToWeekDate(selectedBudgetMonth);
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAWEEK,
      graphDataWeek: graphDataWeek,
    });
  }, [selectedBudgetId, selectedBudgetMonth, dispatch]);

  const handleBudgetSwipeCallback = (index) => {
    if (index < budgets.length - 1) {
      var budgetId = budgets[index].budgetId;
      var costSnapShots = budgets[index].costSnapShots;
      console.log(
        "BudgetCarousell::handleBudgetSwipeCallback::result::" + result
      );
      dispatch({
        type: ACTION_TYPES.SET_BUDGETID,
        selectedBudgetId: budgetId,
      });

      var graphDataAmount = convertCostSnapShotsToWeekAmount(costSnapShots);
      dispatch({
        type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
        graphDataAmount: graphDataAmount,
      });

      var graphDataWeek = convertCostSnapShotsToWeekDate(selectedBudgetMonth);
      dispatch({
        type: ACTION_TYPES.SET_GRAPHDATAWEEK,
        graphDataWeek: graphDataWeek,
      });
    }
  };

  const convertCostSnapShotsToWeekAmount = (costSnapShots) => {
    const amountArr = generateAmountFromMonth(
      costSnapShots,
      selectedBudgetMonth
    );
    return amountArr;
  };

  const convertCostSnapShotsToWeekDate = (selectedBudgetMonth) => {
    const arr = generateMondayStringFromMonth(selectedBudgetMonth);
    return arr;
  };

  const getIndexFromBudgetArr = (id) => {
    const index = budgets.findIndex((obj) => obj.budgetId === id);
    return index;
  };

  return (
    <View style={styles.centered}>
      <Carousel
        data={budgets}
        renderItem={_renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        inactiveSlideShift={0}
        onSnapToItem={(index) => handleBudgetSwipeCallback(index)}
        scrollInterpolator={scrollInterpolator}
        slideInterpolatedStyle={animatedStyles}
        useScrollView={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    ...centered,
  },
});

export default withTheme(BudgetCarousel);
