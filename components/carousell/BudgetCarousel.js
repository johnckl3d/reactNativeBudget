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
  const selectedBudgetIndex = FSM.selectedBudgetIndex;
  const selectedBudgetMonthIndex = FSM.selectedBudgetMonthIndex;
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);

  const dispatch = useDispatch();

  const _renderItem = ({ item }) => {
    var costSnapShots = item.costSnapShots;
    var monthArr = generateMonthRange(selectedBudgetMonthIndex);
    var monthStr = monthArr[selectedBudgetMonthIndex];
    var graphDataAmount = convertCostSnapShotsToWeekAmount(
      costSnapShots,
      monthStr
    );

    var graphDataWeek = convertCostSnapShotsToWeekDate(monthStr);

    return (
      <Chart graphDataAmount={graphDataAmount} graphDataWeek={graphDataWeek} />
    );
  };

  const handleBudgetGraph = (index) => {
    console.log("BudgetCarousel::handleGraph::index::" + index);
    if (index != -1 && index < budgets.length - 1) {
      dispatch({
        type: ACTION_TYPES.SET_BUDGETINDEX,
        selectedBudgetIndex: index,
      });
    }
  };

  const convertCostSnapShotsToWeekAmount = (costSnapShots, monthStr) => {
    const amountArr = generateAmountFromMonth(costSnapShots, monthStr);
    return amountArr;
  };

  const convertCostSnapShotsToWeekDate = (monthStr) => {
    const arr = generateMondayStringFromMonth(monthStr);
    return arr;
  };

  return (
    <View style={styles.centered}>
      <Carousel
        data={budgets}
        renderItem={_renderItem}
        sliderWidth={wp(100)}
        itemWidth={wp(100)}
        inactiveSlideShift={0}
        firstItem={selectedBudgetIndex}
        initialScrollIndex={selectedBudgetIndex}
        onSnapToItem={(index) => handleBudgetGraph(index)}
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
