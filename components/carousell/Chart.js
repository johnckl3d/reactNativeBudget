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
import i18n from "@I18N/i18n";
import { StyleSheet, View, Dimensions } from "react-native";
import Colors from "@Styles/colors";
import {
  getFirstDayOfWeek,
  getWeekOfDayWithOffset,
  generateMondayStringFromMonth,
  getDayOfMonthFromDate,
  generateMonthRange,
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

const Chart = ({ graphDataAmount, graphDataWeek }) => {
  // const FSM = useSelector((store) => store.FSM);
  // const graphDataAmount = FSM.graphDataAmount;
  // const graphDataWeek = FSM.graphDataWeek;
  // const selectedBudgetId = FSM.selectedBudgetId;
  // const selectedBudgetMonth = FSM.selectedBudgetMonth;
  //const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("Chart::useeffect");
  //   var graphDataAmount = convertCostSnapShotsToWeekAmount();
  //   dispatch({
  //     type: ACTION_TYPES.SET_GRAPHDATAAMOUNT,
  //     graphDataAmount: graphDataAmount,
  //   });

  //   var graphDataWeek = convertCostSnapShotsToWeekDate();
  //   dispatch({
  //     type: ACTION_TYPES.SET_GRAPHDATAWEEK,
  //     graphDataWeek: graphDataWeek,
  //   });
  // }, [selectedBudgetId, selectedBudgetMonth, dispatch]);

  // const convertCostSnapShotsToWeekAmount = () => {
  //   const costSnapShots = data.costSnapShots;
  //   console.log(
  //     "Chart::convertCostSnapShotsToWeekAmount::" +
  //       JSON.stringify(costSnapShots)
  //   );
  //   const amountArr = generateAmountFromMonth(
  //     costSnapShots,
  //     selectedBudgetMonth
  //   );
  //   return amountArr;
  // };

  // const convertCostSnapShotsToWeekDate = () => {
  //   const arr = generateMondayStringFromMonth(selectedBudgetMonth);
  //   return arr;
  // };
  if (graphDataAmount || graphDataAmount.length < 1) {
    return <View></View>;
  }
  return (
    <View>
      <LineChart
        data={{
          labels: graphDataWeek ? graphDataWeek : ["?", "?", "?", "?"],
          datasets: [
            {
              data: graphDataAmount ? graphDataAmount : [0, 0, 0, 0],
            },
          ],
        }}
        width={wp(100)} // from react-native
        height={220}
        yAxisLabel={i18n.t("common.currency")}
        yAxisSuffix=""
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
            // r: "6",
            // strokeWidth: "2",
            // stroke: "#ffa726",
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
