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

  const [graphData, setGraphData] = useState({
    graphDataAmount: null,
    graphDataWeek: null,
  });
  const dispatch = useDispatch();

  const _renderItem = ({ item }) => {
    if (!graphData.graphDataAmount || !graphData.graphDataWeek) {
      console.log("BudgetCarousel::Can't render chart");
      return <View></View>;
    }
    return (
      <Chart
        graphDataAmount={graphData.graphDataAmount}
        graphDataWeek={graphData.graphDataWeek}
      />
    );
  };

  useEffect(() => {
    handleGraph(selectedBudgetIndex);
  }, [selectedBudgetIndex]);

  const handleGraph = (index) => {
    console.log("BudgetCarousel::handleGraph");
    if (index != -1 && index < budgets.length - 1) {
      var costSnapShots = budgets[index].costSnapShots;
      dispatch({
        type: ACTION_TYPES.SET_BUDGETINDEX,
        selectedBudgetIndex: index,
      });

      var graphDataAmount = convertCostSnapShotsToWeekAmount(costSnapShots);

      var graphDataWeek = convertCostSnapShotsToWeekDate(
        budgets[selectedBudgetMonthIndex]
      );
      var copiedGraphData = { ...graphData };
      setGraphData((prevStat) => ({
        ...copiedGraphData,
        graphDataAmount: graphDataAmount,
        graphDataWeek: graphDataWeek,
      }));
      console.log(
        "BudgetCarousel::handleGraph::graphData::" + JSON.stringify(graphData)
      );
    }
  };

  const convertCostSnapShotsToWeekAmount = (costSnapShots) => {
    const amountArr = generateAmountFromMonth(
      costSnapShots,
      budgets[selectedBudgetMonthIndex]
    );
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
        onSnapToItem={(index) => handleGraph(index)}
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
