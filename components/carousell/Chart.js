import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
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
import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "@Styles/colors";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateMondayStringFromMonth,
  getDayOfMonthFromDate,
  generateMonthRange,
  getCurrentMonthIndexFromMonthArray,
  generateAmountFromMonth,
} from "@Utils/dates";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import ACTION_TYPES from "@Actions/actionTypes";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "@Utils/scalingUtils";

const Chart = (props) => {
  const FSM = useSelector((store) => store.FSM);
  const login = useSelector((store) => store.login);
  const budgets = useSelector((store) => store.budgets);
  const dispatch = useDispatch();
  const width = Dimensions.get("window").width;

  useEffect(() => {
    var result = convertCostSnapShotsToWeekAmount();
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
      graphDataAmount: result,
    });
  }, [dispatch]);

  useEffect(() => {
    var result = convertCostSnapShotsToWeekDate();
    dispatch({
      type: ACTION_TYPES.SET_GRAPHDATAWEEK,
      graphDataWeek: result,
    });
  }, [dispatch]);

  const getIndexFromBudgetArr = (id) => {
    const index = budgets.findIndex((obj) => obj.budgetId === id);
    return index;
  };

  const convertCostSnapShotsToWeekAmount = () => {
    const budgetIndex = budgets.findIndex(
      (obj) => obj.budgetId === FSM.selectedBudgetId
    );
    const monthStr = FSM.selectedBudgetMonth;
    const costSnapShots = budgets[budgetIndex].costSnapShots;
    const amountArr = generateAmountFromMonth(costSnapShots, monthStr);

    return amountArr;
  };

  const convertCostSnapShotsToWeekDate = () => {
    const monthStr = FSM.selectedBudgetMonth;
    const arr = generateMondayStringFromMonth(monthStr);
    return arr;
  };

  return (
    <View>
      <LineChart
        data={{
          labels: generateMondayStringFromMonth(moment()),
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Colors.chartBackgroundColor,
          backgroundGradientFrom: Colors.chartBackgroundGradientFrom,
          backgroundGradientTo: Colors.chartBackgroundGradientTo,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default withTheme(Chart);
